import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-sidebar',
  imports: [LinkComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
