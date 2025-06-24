import { Routes } from '@angular/router';
import { CenterLayoutComponent } from './layouts/center-layout/center-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { StandardLayoutComponent } from './layouts/standard-layout/standard-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: StandardLayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    component: StandardLayoutComponent,
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
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
