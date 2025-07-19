import { Component, effect, HostListener, signal } from '@angular/core';
import { ContentService } from '../../../content/services/content.service';
import { LayoutService } from '../../services/layout.service';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-menu',
  imports: [LinkComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  isShown = signal(false);
  private initialized = signal(false);
  categories: {
    name: string;
    path: string;
    count: number;
  }[] = [];

  constructor(private layout: LayoutService, contentService: ContentService) {
    contentService
      .getCategoryList()
      .subscribe((categories) => (this.categories = categories));

    effect(() => {
      this.isShown.set(this.layout.menu());
      // Mark as initialized after the first effect run
      if (!this.initialized()) {
        this.initialized.set(true);
      }
    });
  }

  getMenuClasses(): string {
    // If not initialized yet, ensure the menu is completely hidden
    if (!this.initialized()) {
      return 'opacity-0 pointer-events-none fixed inset-0 z-10 backdrop-blur-xl translate-x-full sm:translate-x-0 sm:-translate-y-full invisible';
    }
    
    if (this.isShown()) {
      return 'opacity-100 fixed inset-0 z-10 transition-all duration-200 backdrop-blur-xl';
    } else {
      return 'opacity-0 pointer-events-none fixed inset-0 z-10 transition-all duration-200 backdrop-blur-xl translate-x-full sm:translate-x-0 sm:-translate-y-full';
    }
  }

  onClose($event: Event) {
    $event.preventDefault();
    this.layout.closeMenu();
  }

  @HostListener('document:keydown.escape')
  handleEscKey() {
    this.layout.closeMenu();
  }
}
