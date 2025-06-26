import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ContentService } from './services/content.service';

export const contentGuard: CanActivateFn = (route) => {
  const contentService = inject(ContentService);
  const router = inject(Router);

  const category = route.paramMap.get('category') || '';
  const id = route.paramMap.get('id');

  // Post
  if (category && id) {
    return contentService.getContent(category, id).pipe(
      map(() => true), // Content exists, allow navigation
      catchError((error) => {
        console.error(`Content guard: Content not found for ${category}/${id}:`, error);
        router.navigate(['/error/not-found']);
        return of(false); // Prevent navigation
      })
    );
  }
  // Category
  else if (category && !id) {
    return contentService.getCategory(category).pipe(
      map(() => true), // Category exists, allow navigation
      catchError((error) => {
        console.error(`Content guard: Category not found for ${category}:`, error);
        router.navigate(['/error/not-found']);
        return of(false); // Prevent navigation
      })
    );
  }

  // Invalid route parameters
  console.error('Content guard: Invalid route parameters');
  router.navigate(['/error/not-found']);
  return false;
};
