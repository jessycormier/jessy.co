import { Routes } from '@angular/router';
import { Status404PageComponent } from './pages/status-404-page/status-404-page.component';
import { Status418PageComponent } from './pages/status-418-page/status-418-page.component';
import { Status500PageComponent } from './pages/status-500-page/status-500-page.component';

export const errorRoutes: Routes = [
  { path: 'client', component: Status418PageComponent },
  { path: 'not-found', component: Status404PageComponent },
  { path: 'server-error', component: Status500PageComponent },

  { path: '404', redirectTo: 'not-found' },
  { path: '418', redirectTo: 'client' },
  { path: '500', redirectTo: 'server-error' },
];
