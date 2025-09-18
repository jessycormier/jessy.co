import { Injectable, Renderer2, RendererFactory2, signal, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
        }

        // Split out the last item for now for visual reasons.
        // I may want to create slots for each visual part so I can better
        // control what shows on different screen sizes..
        if (breadcrumb.length === 2) {
          breadcrumb = breadcrumb.slice(0, 1);
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
