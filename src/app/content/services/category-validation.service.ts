import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ContentCategory } from '../enum/content-category.enum';
import { CategoryInfo } from '../interfaces/category-info.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryValidationService {

  private http = inject(HttpClient);
  private categories$ = this.loadCategories();

  private loadCategories(): Observable<CategoryInfo[]> {
    return this.http
      .get<{
        categories: CategoryInfo[];
        latest: any[];
      }>(`content/index.json`)
      .pipe(
        map((data) => data.categories),
        shareReplay(1),
      );
  }

  /**
   * Get all available categories from index.json
   */
  getAvailableCategories(): Observable<CategoryInfo[]> {
    return this.categories$;
  }

  /**
   * Check if a category path exists in index.json
   */
  private isCategoryValid(categoryPath: string): Observable<boolean> {
    return this.categories$.pipe(map((categories) => categories.some((cat) => cat.path === categoryPath)));
  }

  /**
   * Map category path to ContentCategory enum
   * Add new mappings here when adding new categories to the enum
   */
  private getCategoryEnum(categoryPath: string): ContentCategory | null {
    const categoryMap: Record<string, ContentCategory> = {
      thoughts: ContentCategory.Thought,
      posts: ContentCategory.Post,
      blog: ContentCategory.Blog,
      'figment-blog': ContentCategory.FigmentBlog,
      'site-updates': ContentCategory.SiteUpdate,
    };

    return categoryMap[categoryPath] || null;
  }

  /**
   * Get valid ContentCategory enum for a path, only if it exists in index.json
   */
  getValidCategoryEnum(categoryPath: string): Observable<ContentCategory | null> {
    return this.isCategoryValid(categoryPath).pipe(map((isValid) => (isValid ? this.getCategoryEnum(categoryPath) : null)));
  }

  /**
   * Get all valid category paths that have corresponding enum values
   */
  private getValidCategoryPaths(): Observable<string[]> {
    return this.categories$.pipe(map((categories) => categories.map((cat) => cat.path).filter((path) => this.getCategoryEnum(path) !== null)));
  }
}
