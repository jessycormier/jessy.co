import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';
import { UnifiedService } from '../services/unified.service';
import { ContentCategory } from './content-category.enum';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private unifiedService = inject(UnifiedService);

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
        return json.categories.filter((c) => c.path === category)[0].items;
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
    this.router.navigate(['/error/404']);
    return of(null);
  }

  private handleError(error: any) {
    this.goToError404();
    return throwError(() => new Error(error));
  }
}
