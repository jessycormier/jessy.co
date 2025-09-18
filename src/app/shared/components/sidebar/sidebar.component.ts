import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../../content/services/content.service';
import { LayoutService } from '../../services/layout.service';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-sidebar',
  imports: [LinkComponent, AsyncPipe],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private contentService = inject(ContentService);
  protected layout = inject(LayoutService);

  categories$ = this.contentService.getCategoryList();

  closeSidebar() {
    this.layout.closeMenu();
  }
}
