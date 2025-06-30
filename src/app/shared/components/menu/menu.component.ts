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
    });
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
