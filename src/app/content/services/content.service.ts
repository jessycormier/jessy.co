import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, throwError, of, retry, timeout } from 'rxjs';
import { UnifiedService } from '../../shared/services/unified.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private unifiedService = inject(UnifiedService);

  getContent(category: string, id: string) {
    return this.http
      .get(`content/${category}/${id}.md`, { responseType: 'text' })
      .pipe(
        timeout(10000), // 10 second timeout
        retry(2), // Retry up to 2 times
        map((markdown) => {
          const parsedMarkdown = this.unifiedService.parseMarkdown(
            markdown
          ) || { frontmatter: null, markdown: null };
          return parsedMarkdown || { frontmatter: null, markdown: null };
        }),
        catchError((error) => this.handleContentError(error, 'content'))
      );
  }

  getCategory(category: string) {
    return this.getContentIndex().pipe(
      map((json) => {
        const categoryData = json.categories.find(
          (c) => c.path === `logs/${category}`
        );
        if (!categoryData) {
          throw new Error(`Category not found: ${category}`);
        }
        return Array.isArray(categoryData.items) ? categoryData.items : [];
      }),
      catchError((error) => this.handleContentError(error, 'category'))
    );
  }

  getCategoryList() {
    return this.getContentIndex().pipe(
      map((json) => {
        return json.categories.map((c) => {
          return { ...c, items: undefined };
        });
      }),
      catchError((error) => {
        console.error('Failed to load category list:', error);
        // Return empty array instead of navigating to error page
        return of([]);
      })
    );
  }

  getLatest() {
    return this.getContentIndex().pipe(
      map((json) => json.latest || []),
      catchError((error) => {
        console.error('Failed to load latest posts:', error);
        // Return empty array instead of navigating to error page
        return of([]);
      })
    );
  }

  private getContentIndex() {
    return this.http
      .get<{
        categories: { name: string; path: string; count: number; items?: [] }[];
        latest: { id: string; date: string; title: string; path: string }[];
      }>(`content.json`, { responseType: 'json' })
      .pipe(
        timeout(10000), // 10 second timeout
        retry(2) // Retry up to 2 times for network issues
      );
  }

  private handleContentError(error: any, type: string) {
    console.error(`Content service error (${type}):`, error);

    // Only navigate to 404 for actual 404 responses, not network errors
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.router.navigate(['/error/not-found'], { relativeTo: this.route.root });
    } else {
      // For other errors (network, timeout, etc), log but don't redirect
      console.warn(`Non-critical error in ${type} loading, continuing...`);
    }

    return throwError(() => new Error(error));
  }
}
