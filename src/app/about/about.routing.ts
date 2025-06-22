import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
    data: {
      meta: {
        title: 'About Jessy | Jessy.co',
        description:
          'Learn more about Jessy - a web developer, photographer, teacher, father, and lifelong learner passionate about building tools and sharing knowledge.',
        keywords: 'about jessy, web developer, photographer, teacher, portfolio, biography',
      },
    },
  },
];
