import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { ContentService } from './services/content.service';

export const contentResolver: ResolveFn<any | null> = (route) => {
  const contentService = inject(ContentService);
  const router = inject(Router);

  const category = route.paramMap.get('category') || '';
  const id = route.paramMap.get('id');

  // Post
  if (category && id) {
    return contentService.getContent(category, id).pipe(
      catchError((error) => {
        console.error(`Error loading content for ${category}/${id}:`, error);
        router.navigate(['/error/not-found']);
        return EMPTY;
      })
    );
  }
  // Category
  else if (category && !id) {
    return contentService.getCategory(category).pipe(
      catchError((error) => {
        console.error(`Error loading category ${category}:`, error);
        router.navigate(['/error/not-found']);
        return EMPTY;
      })
    );
  }

  // Invalid route parameters
  console.error('Invalid route parameters. Category and/or ID is missing.');
  router.navigate(['/error/not-found']);
  return EMPTY;
};
