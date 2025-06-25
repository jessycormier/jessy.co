import { Routes } from '@angular/router';
import HomePageComponent from './home/pages/home-page/home-page.component';
import { CenterLayoutComponent } from './layouts/center-layout/center-layout.component';
import { StandardLayoutComponent } from './layouts/standard-layout/standard-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: StandardLayoutComponent,
    children: [
      {
        path: '',
        title: 'Jessy.co - Developer, Builder, Learner',
        component: HomePageComponent, // eager loaded component for landing page.
        // loadComponent: () => import('./home/pages/home-page/home-page.component'),
      },
      {
        path: 'about',
        title: 'About Jessy | Jessy.co',
        loadComponent: () =>
          import('./about/pages/about-page/about-page.component'),
      },
      {
        path: 'resume',
        title: 'Resume | Jessy.co',
        loadComponent: () =>
          import('./resume/pages/resume-page/resume-page.component'),
      },
      {
        path: 'logs',
        loadChildren: () =>
          import('./content/content.module').then((m) => m.ContentModule),
      },
    ],
  },
  {
    path: 'error',
    component: CenterLayoutComponent,
    children: [
      {
        path: 'client',
        title: 'Client Error | Jessy.co',
        loadComponent: () =>
          import('./error/pages/status-418-page/status-418-page.component'),
      },
      {
        path: 'not-found',
        title: 'Page Not Found | Jessy.co',
        loadComponent: () =>
          import('./error/pages/status-404-page/status-404-page.component'),
      },
      {
        path: 'server-error',
        title: 'Server Error | Jessy.co',
        loadComponent: () =>
          import('./error/pages/status-500-page/status-500-page.component'),
      },
      { path: '404', redirectTo: 'not-found' },
      { path: '418', redirectTo: 'client' },
      { path: '500', redirectTo: 'server-error' },
    ],
  },
  {
    path: '**',
    redirectTo: 'error/not-found',
  },
];
