import { Injectable, Renderer2, RendererFactory2, signal, inject } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from './theme.service';

/**
 * Layout Service
 *
 * Handles layout-related functionality like menu state, breadcrumbs, and scroll management.
 * Theme functionality has been moved to ThemeService.
 */
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private renderer: Renderer2;
  private themeService = inject(ThemeService);

  mask = signal<boolean>(false);
  menu = signal<boolean>(false);

  breadcrumb = signal<string[]>([]);

  constructor(
    private router: Router,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let breadcrumb = event.url.split('/').filter((s) => s.length > 0);
        if (event.url === '/') {
          breadcrumb = ['home'];
        } else if (event.url === '/log') {
          breadcrumb = ['logs']; // Display "logs" when viewing /log page
        } else {
          // Transform breadcrumbs for better display
          breadcrumb = breadcrumb.map((item, index) => {
            // Convert 'logs' to readable format but keep the structure
            if (item === 'logs') {
              return 'logs';
            }
            // For post URLs, convert hyphens to spaces for better readability
            if (index > 1) { // Anything after logs/category is likely a post
              return item.replace(/-/g, ' ');
            }
            // Keep category names as they are
            return item;
          });

          // Don't truncate breadcrumbs - show the full path for posts
          // This allows showing: logs / thoughts / post-name
        }

        this.breadcrumb.set(breadcrumb);

        if (this.menu()) {
          this.closeMenu();
        }
      }
    });
  }

  private splitAddDelimiter(str: string, delimiter: string) {
    const regex = new RegExp(`${delimiter}[^${delimiter}]+`, 'g');
    return str.match(regex) || [];
  }

  openMenu() {
    this.mask.set(true);
    this.menu.set(true);
    // Dialog handles scroll management automatically
  }

  closeMenu() {
    this.mask.set(false);
    this.menu.set(false);
    // Dialog handles scroll management automatically
  }

  // Theme-related methods - delegated to ThemeService
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getTheme(): string {
    return this.themeService.getTheme();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }
}
