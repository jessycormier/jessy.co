import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';
import { UnifiedService } from '../../services/unified.service';
import { ContentCategory } from '../enum/content-category.enum';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private unifiedService = inject(UnifiedService);
  private platformId = inject(PLATFORM_ID);

  getContent(category: ContentCategory, id: string) {
    const results = this.http.get(`content/${category}/${id}.md`, { responseType: 'text' }).pipe(
      map((markdown) => {
        const parsedMarkdown = this.unifiedService.parseMarkdown(markdown) || { frontmatter: null, markdown: null };
        return parsedMarkdown || { frontmatter: null, markdown: null };
      }),
      catchError((error) => this.handleError(error)),
    );

    return results;
  }
  getCategory(category: ContentCategory) {
    const results = this.getContentIndex().pipe(
      map((json) => {
        const categoryData = json.categories.find((c) => c.path === category);
        if (!categoryData) {
          throw new Error(`Category '${category}' not found in index`);
        }
        return categoryData.items || [];
      }),
      catchError((error) => this.handleError(error)),
    );

    return results;
  }

  getCategoryList() {
    const results = this.getContentIndex().pipe(
      map((json) => {
        return json.categories.map((c) => {
          return { ...c, items: undefined };
        });
      }),
      catchError((error) => this.handleError(error)),
    );

    return results;
  }

  getLatest() {
    const results = this.getContentIndex().pipe(
      map((json) => json.latest),
      catchError((error) => this.handleError(error)),
    );

    return results;
  }

  private getContentIndex() {
    const results = this.http
      .get<{
        categories: { name: string; path: string; count: number; items?: [] }[];
        latest: { id: string; date: string; title: string; path: string }[];
      }>(`content/index.json`, { responseType: 'json' })
      .pipe(catchError((error) => this.handleError(error)));

    return results;
  }
  goToError404() {
    // Only navigate during browser rendering, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/error/404']);
    }
    return of(null);
  }

  private handleError(error: any) {
    this.goToError404();
    return throwError(() => new Error(error));
  }
}
