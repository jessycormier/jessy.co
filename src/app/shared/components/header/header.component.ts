import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { BrandComponent } from '../brand/brand.component';
import { IconsModule } from '../../icon.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [BrandComponent, ThemeToggle, IconsModule, RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  layout = inject(LayoutService);

  getBreadcrumbUrl(index: number): string {
    const breadcrumbs = this.layout.breadcrumb();
    if (index === 0) {
      // First item 'log' redirects to root
      return '/';
    }
    // Build cumulative path: /log/thoughts, /log/thoughts/cool-stuff, etc.
    return '/' + breadcrumbs.slice(0, index + 1).join('/');
  }
}
