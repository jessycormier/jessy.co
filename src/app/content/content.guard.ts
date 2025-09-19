import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ContentService } from './services/content.service';

export const contentGuard: CanActivateFn = (route) => {
  const contentService = inject(ContentService);
  const router = inject(Router);

  const category = route.paramMap.get('category') || '';
  const id = route.paramMap.get('id');
  const isLogRoute = route.routeConfig?.path === 'log' || route.routeConfig?.path === 'log/:id';

  // Handle /log/:id route
  if (isLogRoute && id) {
    return contentService.getContent('log', id).pipe(
      map(() => true), // Content exists, allow navigation
      catchError((error) => {
        console.error(`Content guard: Log content not found for ${id}:`, error);
        router.navigate(['/error/not-found']);
        return of(false); // Prevent navigation
      })
    );
  }
  // Handle /log route (category list)
  else if (isLogRoute && !id) {
    return contentService.getCategory('log').pipe(
      map(() => true), // Category exists, allow navigation
      catchError((error) => {
        console.error(`Content guard: Log category not found:`, error);
        router.navigate(['/error/not-found']);
        return of(false); // Prevent navigation
      })
    );
  }
  // Post
  else if (category && id) {
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
