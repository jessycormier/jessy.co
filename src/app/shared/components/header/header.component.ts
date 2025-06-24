import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { BrandComponent } from '../brand/brand.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-header',
  imports: [BrandComponent, LinkComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public layout: LayoutService) {
    layout = inject(LayoutService);
  }
}
