import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentService } from './services/content.service';

/**
 * @note Guard has verified content for valid routes.
 */
export const contentResolver: ResolveFn<any | null> = (route) => {
  const contentService = inject(ContentService);

  const category = route.paramMap.get('category') || '';
  const id = route.paramMap.get('id');
  const isLogRoute = route.routeConfig?.path === 'log' || route.routeConfig?.path === 'log/:id';

  if (isLogRoute && id) {
    // Handle /log/:id route
    return contentService.getContent('log', id);
  }
  else if (isLogRoute && !id) {
    // Handle /log route (category list)
    return contentService.getCategory('log');
  }
  else if (category && id) {
    return contentService.getContent(category, id);
  }
  else if (category && !id) {
    return contentService.getCategory(category);
  }

  // This should never happen since the guard prevents invalid routes
  return null;
};
