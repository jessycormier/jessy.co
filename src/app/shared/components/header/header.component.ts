import { Component, inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { BrandComponent } from '../brand/brand.component';
import { LinkComponent } from '../link/link.component';
import { IconsModule } from '../../icon.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [BrandComponent, LinkComponent, ThemeToggle, IconsModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  layout = inject(LayoutService);
}
