import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      meta: {
        title: 'Jessy.co - Developer, Builder, Learner',
        description: "Hi, I'm Jessy welcome to my website. I write about development, share thoughts, and document my journey building tools.",
        keywords: 'jessyco, jessy, developer, blog, portfolio, angular, typescript, web development',
      },
    },
  },
];
