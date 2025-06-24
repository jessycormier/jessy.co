import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private renderer: Renderer2;

  mask = signal<boolean>(false);
  menu = signal<boolean>(false);

  breadcrumb: string[] = [];

  constructor(
    private router: Router,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumb = event.url.split('/').filter((s) => s.length > 0);
        if (event.url === '/') {
          this.breadcrumb = ['home'];
        }

        // Split out the last item for now for visual reasons.
        // I may want to create slots for each visual part so I can better
        // control what shows on different screen sizes..
        if (this.breadcrumb.length === 2) {
          this.breadcrumb = this.breadcrumb.slice(0, 1);
        }

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
    this.disableScroll();
  }

  closeMenu() {
    this.mask.set(false);
    this.menu.set(false);
    this.enableScroll();
  }

  private disableScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'padding-right', '16px'); // Adjust for scrollbar width
  }

  enableScroll() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'padding-right');
  }

  toggleTheme() {

    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    console.log(`Switching theme from ${currentTheme} to ${newTheme}`);
    this.setTheme(newTheme);
  }

  getTheme() {
    return window.localStorage.getItem('theme');
  }

  setTheme(theme = 'dark') {
    window.localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
