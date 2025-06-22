import { Data } from '@angular/router';
import { ContentCategory } from '../enum/content-category.enum';
import { ContentLayout } from '../enum/content-layout.enum';

export interface ContentRouteData extends Data {
  layout: ContentLayout;
  category: ContentCategory;
}
