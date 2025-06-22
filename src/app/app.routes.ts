import { Routes } from '@angular/router';
import { CenterLayoutComponent } from '@jc/layouts/center-layout/center-layout.component';
import { EmptyLayoutComponent } from '@jc/layouts/empty-layout/empty-layout.component';
import { StandardLayoutComponent } from '@jc/layouts/standard-layout/standard-layout.component';
import { Status404PageComponent } from '@jc/error/pages/status-404-page/status-404-page.component';
import { Status418PageComponent } from '@jc/error/pages/status-418-page/status-418-page.component';
import { Status500PageComponent } from '@jc/error/pages/status-500-page/status-500-page.component';

export const routes: Routes = [
  // Standard Layout
  {
    path: '',
    component: StandardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'resume',
        loadChildren: () => import('./resume/resume.module').then((m) => m.ResumeModule),
      },
    ],
  },
  // Empty Layout
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./content/content.module').then((m) => m.ContentModule),
      },
    ],
  },
  // Center Screen Layout
  {
    path: 'error',
    component: CenterLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./error/error.module').then((m) => m.ErrorModule) }
    ],
  },
  // Catch All to redirect to not found 404 page.
  {
    path: '**',
    redirectTo: 'error/not-found',
  },
];
