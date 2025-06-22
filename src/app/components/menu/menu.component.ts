import { Component, effect, HostListener } from '@angular/core';
import { LayoutService } from '@jc/services/layout.service';
import { LinkComponent } from '../link/link.component';
import { CommonModule } from '@angular/common';
import { ContentService } from '@jc/content/services/content.service';
import { ContentCategory } from '@jc/content/enum/content-category.enum';

@Component({
  selector: 'app-menu',
  imports: [LinkComponent, CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  isShown = false;
  categories: {
    name: string;
    path: string;
    count: number;
  }[] = [];

  constructor(
    private layout: LayoutService,
    contentService: ContentService,
  ) {

    contentService.getCategoryList().subscribe((categories) => (this.categories = categories));

    effect(() => {
      this.isShown = this.layout.menu();
    });
  }

  onClose($event: Event) {
    $event.preventDefault();
    this.layout.closeMenu();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.layout.closeMenu();
  }
}
