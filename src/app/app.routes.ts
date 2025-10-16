import { Routes } from '@angular/router';
import { contentResolver } from './content/content.resolver';
import { contentGuard } from './content/content.guard';
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
      },
      {
        path: 'about',
        title: 'About Jessy | Jessy.co',
        loadComponent: () => import('./about/pages/about-page/about-page.component'),
      },
      {
        path: 'resume',
        title: 'Resume | Jessy.co',
        loadComponent: () => import('./resume/pages/resume-page/resume-page.component'),
      },
      // This is to handle old consulting URL redirect to about.
      {
        path: 'consulting',
        redirectTo: '',
      },
      {
        path: 'logs/:category/:id',
        canActivate: [contentGuard],
        resolve: { content: contentResolver },
        title: 'Log | Jessy.co',
        loadComponent: () => import('./content/pages/content-page/content-page.component'),
      },
      {
        path: 'log',
        canActivate: [contentGuard],
        resolve: { items: contentResolver },
        title: 'Log | Jessy.co',
        loadComponent: () => import('./content/pages/content-list-page/content-list-page.component'),
      },
      {
        path: 'log/:id',
        canActivate: [contentGuard],
        resolve: { content: contentResolver },
        title: 'Log | Jessy.co',
        loadComponent: () => import('./content/pages/content-page/content-page.component'),
      },
      {
        path: 'logs/:category',
        canActivate: [contentGuard],
        resolve: { items: contentResolver },
        title: 'Logs | Jessy.co',
        loadComponent: () => import('./content/pages/content-list-page/content-list-page.component'),
      },
    ],
  },
  {
    path: 'design',
    title: 'Design Test | Jessy.co',
    loadComponent: () => import('./layouts/design-test-layout/design-test-layout'),
  },
  {
    path: 'error',
    component: CenterLayoutComponent,
    children: [
      {
        path: 'client',
        title: 'Client Error | Jessy.co',
        loadComponent: () => import('./error/pages/status-418-page/status-418-page.component'),
      },
      {
        path: 'not-found',
        title: 'Page Not Found | Jessy.co',
        loadComponent: () => import('./error/pages/status-404-page/status-404-page.component'),
      },
      {
        path: 'server-error',
        title: 'Server Error | Jessy.co',
        loadComponent: () => import('./error/pages/status-500-page/status-500-page.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error/not-found',
  },
];
