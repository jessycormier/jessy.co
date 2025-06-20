import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ContentService } from './services/content.service';
import { CategoryValidationService } from './services/category-validation.service';

export const contentResolver: ResolveFn<any | null> = (route) => {
  const contentService = inject(ContentService);
  const categoryValidationService = inject(CategoryValidationService);
  const router = inject(Router);

  // Get category and id from route parameters
  const categoryParam = route.paramMap.get('category');
  const id = route.paramMap.get('id');

  if (!categoryParam) {
    router.navigate(['/error/404']);
    return of(null);
  }

  // Validate category exists in index.json and get corresponding enum
  return categoryValidationService.getValidCategoryEnum(categoryParam).pipe(
    switchMap((category) => {
      if (!category) {
        router.navigate(['/error/404']);
        return of(null);
      }

      // Determine if this is a list or content request based on presence of id
      if (id) {
        // Content request (e.g., /blog/my-post)
        return contentService.getContent(category, id).pipe(
          catchError(() => {
            router.navigate(['/error/404']);
            return of(null);
          })
        );
      } else {
        // List request (e.g., /blog)
        return contentService.getCategory(category).pipe(
          catchError(() => {
            router.navigate(['/error/404']);
            return of(null);
          })
        );
      }
    })
  );
};
