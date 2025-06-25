import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, map, throwError } from 'rxjs';
import { UnifiedService } from '../../services/unified.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private unifiedService = inject(UnifiedService);

  getContent(category: string, id: string) {
    const results = this.http
      .get(`content/${category}/${id}.md`, { responseType: 'text' })
      .pipe(
        map((markdown) => {
          const parsedMarkdown = this.unifiedService.parseMarkdown(
            markdown
          ) || { frontmatter: null, markdown: null };
          return parsedMarkdown || { frontmatter: null, markdown: null };
        }),
        catchError((error) => this.handleError(error))
      );

    return results;
  }

  getCategory(category: string) {
    const results = this.getContentIndex().pipe(
      map((json) => {
        const categoryData = json.categories.find(c => c.path === `logs/${category}`);
        if (!categoryData) {
          throw new Error(`Category not found: ${category}`);
        }
        return categoryData.items;
      }),
      catchError((error) => this.handleError(error))
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
      catchError((error) => this.handleError(error))
    );

    return results;
  }

  getLatest() {
    const results = this.getContentIndex().pipe(
      map((json) => json.latest),
      catchError((error) => this.handleError(error))
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

  private handleError(error: any) {
    this.router.navigate(['/error/not-found'], { relativeTo: this.route.root });
    return throwError(() => new Error(error));
  }
}
