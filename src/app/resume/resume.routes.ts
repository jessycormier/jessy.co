import { Routes } from '@angular/router';
import { ResumePageComponent } from './pages/resume-page/resume-page.component';

export const resumeRoutes: Routes = [
  {
    path: '',
    component: ResumePageComponent,
    data: {
      meta: {
        title: 'Resume | Jessy.co',
        description: "View Jessy's professional resume and work experience as a web developer and technical educator.",
        keywords: 'resume, cv, web developer, experience, skills, portfolio',
      },
    },
  },
];
