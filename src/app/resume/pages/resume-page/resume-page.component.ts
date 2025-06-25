import { Component, inject } from '@angular/core';
import { BackToHomeButtonComponent } from '../../../shared/components/back-to-home-button/back-to-home-button.component';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { ResumeDateRangeComponent } from '../../resume-date-range/resume-date-range.component';
import { ResumeHelpSectionComponent } from '../../resume-help-section/resume-help-section.component';
import { ResumeWordComponent } from '../../resume-word/resume-word.component';
import { HighlightService } from './../../word-highlight.service';

type HighlightWord = string;
type DisplayWord = string;
type Skill = [DisplayWord, HighlightWord];
type CategoryName = string;

@Component({
  selector: 'app-resume-page',
  imports: [
    ResumeWordComponent,
    ToastComponent,
    ResumeDateRangeComponent,
    ResumeHelpSectionComponent,
    BackToHomeButtonComponent,
  ],
  templateUrl: './resume-page.component.html',
})
export default class ResumePageComponent {
  highlightService = inject(HighlightService);

  skillsAndAbilities: [CategoryName, Skill[]][] = [
    [
      'Frameworks and Technologies',
      [
        ['Angular (4+)', 'Angular'],
        ['Astro', 'Astro'],
        ['Deno', 'Deno'],
        ['Electron', 'Electron'],
        ['Grunt', 'Grunt'],
        ['Gulp', 'Gulp'],
        ['JavaScript', 'JavaScript'],
        ['jQuery', 'jQuery'],
        ['NextJS', 'NextJS'],
        ['Node.js', 'Node.js'],
        ['Npm', 'Npm'],
        ['NuGet', 'NuGet'],
        ['Parcel', 'Parcel'],
        ['PHP', 'Php'],
        ['Pnpm', 'Pnpm'],
        ['Python', 'Python'],
        ['React', 'React'],
        ['Rollup', 'Rollup'],
        ['Svelte', 'Svelte'],
        ['SvelteKit', 'SvelteKit'],
        ['TypeScript', 'TypeScript'],
        ['Vite', 'Vite'],
        ['Vue', 'Vue'],
        ['Webpack', 'Webpack'],
        ['Yarn', 'Yarn'],
      ],
    ],
    [
      'Design and Development',
      [
        ['Adobe XD', 'Adobe XD'],
        ['Bootstrap', 'Bootstrap'],
        ['CSS', 'CSS'],
        ['Emmet', 'Emmet'],
        ['Figma', 'Figma'],
        ['HTML', 'HTML'],
        ['Less', 'Less'],
        ['Markdown', 'Markdown'],
        ['Material UI', 'Material UI'],
        ['Responsive Design', 'Responsive Design'],
        ['Sass', 'Sass'],
        ['Storybook', 'Storybook'],
        ['Tailwind CSS', 'Tailwind CSS'],
        ['UI and UX', 'UI and UX'],
      ],
    ],
    [
      'Principles and Patterns',
      [
        ['Decorator', 'Decorator Pattern'],
        ['Dependency Injection', 'Dependency Injection'],
        ['DRY', 'DRY'],
        ['Factory', 'Factory Pattern'],
        ['Functional Programming', 'Functional Programming'],
        ['KISS', 'KISS'],
        ['Microservices', 'Microservices'],
        ['MVC', 'Mvc'],
        ['MVVM', 'Mvvm'],
        ['Observer', 'Observer'],
        ['Progressive Web Apps (PWA)', 'PWA'],
        ['Revealing Module', 'Revealing Module'],
        ['Serverless', 'Serverless'],
        ['Singleton', 'Singleton'],
        ['SOLID', 'SOLID'],
        ['WebForms', 'WebForms'],
      ],
    ],
    [
      'Tools',
      [
        ['Azure DevOps', 'Azure Artifacts'],
        ['Azure DevOps', 'Azure Pipelines'],
        ['Beyond Compare', 'Beyond Compare'],
        ['Bitbucket', 'Bitbucket'],
        ['DevOps', 'DevOps'],
        ['Docker', 'Docker'],
        ['ESLint', 'ESLint'],
        ['Git Kraken', 'Git Kraken'],
        ['Git', 'Git'],
        ['GitHub', 'GitHub'],
        ['Jenkins', 'Jenkins'],
        ['Notepad++', 'Notepad++'],
        ['NPM Packages', 'NPM Packages'],
        ['Prettier', 'Prettier'],
        ['Sublime Text', 'Sublime Text'],
        ['SVN', 'SVN'],
        ['Visual Studio', 'Visual Studio'],
        ['VS Code', 'VS Code'],
      ],
    ],
    [
      'Database and APIs',
      [
        ['AppWrite', 'AppWrite'],
        ['Entity Framework', 'Entity Framework'],
        ['Firebase', 'Firebase'],
        ['GraphQL', 'GraphQL'],
        ['Json Server', 'Json Server'],
        ['MongoDB', 'MongoDB'],
        ['MySQL', 'MySQL'],
        ['Neo4J', 'Neo4J'],
        ['PocketBase', 'PocketBase'],
        ['PostgreSQL', 'PostgreSQL'],
        ['Postman', 'Postman'],
        ['Prisma', 'Prisma'],
        ['SQL Server', 'SQL Server'],
        ['SQLite', 'SQLite'],
        ['Supabase', 'Supabase'],
        ['T-SQL', 'T-SQL'],
      ],
    ],
    [
      'Testing',
      [
        ['BrowserStack', 'BrowserStack'],
        ['Cypress', 'Cypress'],
        ['End-to-End (E2E)', 'E2E'],
        ['Jest', 'Jest'],
        ['Load Testing', 'Load Testing'],
        ['Mocking', 'Mocking'],
        ['Playwright', 'Playwright'],
        ['Protractor', 'Protractor'],
        ['Testing Library', 'Testing Library'],
        ['Unit Testing', 'Unit Testing'],
        // ['Integration Testing', 'Integration Testing'],
      ],
    ],
    [
      'Industries',
      [
        ['Customer Management System (CMS)', 'CMS'],
        ['eCommerce', 'eCommerce'],
        ['Human Resource Management (HRM)', 'HRM'],
        ['Learning Management System (LMS)', 'LMS'],
      ],
    ],
  ];

  onCloseClick() {
    this.highlightService.selectedWord.set(undefined);
  }
}
