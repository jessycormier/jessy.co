import { Routes } from '@angular/router';
import { CenterLayoutComponent } from './layouts/center-layout/center-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { StandardLayoutComponent } from './layouts/standard-layout/standard-layout.component';
import HomePageComponent from './home/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StandardLayoutComponent,
    children: [
      {
        path: '',
        title: 'Jessy.co - Developer, Builder, Learner',
        component: HomePageComponent // eager loaded component for landing page.
        // loadComponent: () => import('./home/pages/home-page/home-page.component'),
      },
      {
        path: 'about',
        title: 'About Jessy | Jessy.co',
        loadComponent: () => import('./about/pages/about-page/about-page.component')
      },
    ],
  },
  {
    path: 'resume',
    component: EmptyLayoutComponent,
    loadChildren: () =>
      import('./resume/resume.module').then((m) => m.ResumeModule),
  },
  {
    path: 'error',
    component: CenterLayoutComponent,
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorModule),
  },
  // Dynamic content routes - Must come 2nd last.
  {
    path: '',
    component: StandardLayoutComponent,
    loadChildren: () =>
      import('./content/content.module').then((m) => m.ContentModule),
  },
  // Catch All to redirect to not found 404 page.
  {
    path: '**',
    redirectTo: 'error/not-found',
  },
];
