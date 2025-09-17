import { Component, inject } from '@angular/core';
import { ContentService } from '../../../content/services/content.service';
import { LayoutService } from '../../services/layout.service';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-sidebar',
  imports: [LinkComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private contentService = inject(ContentService);
  protected layout = inject(LayoutService);

  categories: {
    name: string;
    path: string;
    count: number;
  }[] = [];

  constructor() {
    this.contentService
      .getCategoryList()
      .subscribe((categories) => (this.categories = categories));
  }

  closeSidebar() {
    this.layout.closeMenu();
  }
}
