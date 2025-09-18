import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { BrandComponent } from '../brand/brand.component';
import { IconsModule } from '../../icon.module';

@Component({
  selector: 'app-header',
  imports: [BrandComponent, ThemeToggle, IconsModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  layout = inject(LayoutService);
}
