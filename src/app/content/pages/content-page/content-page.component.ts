import { Component, inject, SecurityContext, ChangeDetectionStrategy, computed, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkdownModule, MarkdownService, SANITIZE } from 'ngx-markdown';
import { LinkComponent } from '../../../shared/components/link/link.component';
import { Content } from '../../interfaces/content.interface';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  imports: [MarkdownModule, RouterLink, LinkComponent],
  providers: [MarkdownService, { provide: SANITIZE, useValue: SecurityContext.HTML }],
  templateUrl: './content-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentPageComponent {
  private themeService = inject(ThemeService);
  private route = inject(ActivatedRoute);

  // Convert route data to signal
  private routeData = toSignal(this.route.data, { initialValue: {} });

  headerBgClasses = computed(() => this.themeService.isDarkMode() ? 'bg-base-300 text-content' : 'bg-base-content text-base-100');

  // Convert properties to signals
  data = signal<Content | null>(null);
  id = signal<string>('');
  date = signal<string>('');
  title = signal<string>('');
  category = signal<string>('');
  aiEditor = signal<boolean>(false);
  markdown = signal<string>('');

  constructor() {
    // Use effect to reactively update when route data changes
    effect(() => {
      const data = this.routeData();
      const content = (data as any)?.['content'] as Content;

      if (content) {
        this.data.set(content);
        this.id.set(content.frontmatter.id);
        this.date.set(content.frontmatter.date);

        // Use title from frontmatter, or fallback to filename from URL
        let title = content.frontmatter.title;
        if (!title || title.trim() === '') {
          // Extract filename from current route
          const urlSegments = this.route.snapshot.url;
          if (urlSegments.length > 0) {
            const filename = urlSegments[urlSegments.length - 1].path;
            title = filename.replace(/-/g, ' '); // Convert hyphens to spaces
          }
        }
        this.title.set(title);

        this.category.set(content.frontmatter.category);
        this.aiEditor.set(content.frontmatter.aiEditor ?? false);
        this.markdown.set(content.markdown);
      }
    });
  }
}
