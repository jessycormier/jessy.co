import { Routes } from '@angular/router';
import { StandardLayoutComponent } from '../layouts/standard-layout/standard-layout.component';
import { ContentCategory } from './content-category.enum';
import { ContentLayout } from './content-layout.enum';
import { contentResolver } from './content.resolver';
import { ContentListPageComponent } from './pages/content-list-page/content-list-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ContentRouteData } from './interfaces/content-route-data.interface';

export const contentRoutes: Routes = [
  {
    path: '',
    component: StandardLayoutComponent,
    children: [
      {
        path: 'thoughts/:id',
        component: ContentPageComponent,
        resolve: { content: contentResolver },
        data: {
          layout: ContentLayout.Content,
          category: ContentCategory.Thought,
        } as ContentRouteData,
      },
      {
        path: 'thoughts',
        component: ContentListPageComponent,
        resolve: { items: contentResolver },
        data: {
          layout: ContentLayout.List,
          category: ContentCategory.Thought,
        } as ContentRouteData,
      },
      // {
      //   path: '',
      //   redirectTo: '/',
      //   pathMatch: 'full',
      // },
    ],
  },
];
