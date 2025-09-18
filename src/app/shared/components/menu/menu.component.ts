import { Component, effect, HostListener, ViewChild, ElementRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../../content/services/content.service';
import { LayoutService } from '../../services/layout.service';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-menu',
  imports: [LinkComponent, AsyncPipe],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @ViewChild('menuDialog') menuDialog!: ElementRef<HTMLDialogElement>;

  private layout = inject(LayoutService);
  private contentService = inject(ContentService);

  categories$ = this.contentService.getCategoryList();

  constructor() {

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
