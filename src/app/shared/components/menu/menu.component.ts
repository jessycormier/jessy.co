import { Component, effect, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ContentService } from '../../../content/services/content.service';
import { LayoutService } from '../../services/layout.service';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-menu',
  imports: [LinkComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @ViewChild('menuDialog') menuDialog!: ElementRef<HTMLDialogElement>;

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
      const isMenuOpen = this.layout.menu();

      // Use setTimeout to ensure ViewChild is available
      setTimeout(() => {
        if (this.menuDialog?.nativeElement) {
          if (isMenuOpen) {
            this.menuDialog.nativeElement.showModal();
          } else {
            this.menuDialog.nativeElement.close();
          }
        }
      });
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
