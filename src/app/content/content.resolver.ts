import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EMPTY } from 'rxjs';
import { ContentService } from './services/content.service';

export const contentResolver: ResolveFn<any | null> = (route) => {
  const contentService = inject(ContentService);

  try {
    const category = route.paramMap.get('category') || '';
    const id = route.paramMap.get('id');

    console.log(`Resolving content for category: ${category}, id: ${id}`);

    // Post
    if (category && id) {
      const content = contentService.getContent(category, id);

      if (!content) {
        throw new Error(
          `No content found for category: ${category}, id: ${id}`
        );
      }

      return content;
    }
    // Category
    else if (category && !id) {
      const content = contentService.getCategory(category);

      if (!content) {
        throw new Error(`No content found for category: ${category}`);
      }

      return content;
    }
    // Could be fun to have a randomizer to go to "known" page if content was not found.
    throw new Error(
      'Invalid route parameters. Category and/or ID is missing or no content found.'
    );
  } catch (error) {
    return EMPTY;
  }
};
