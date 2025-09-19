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
      // First item handling
      if (breadcrumbs[0] === 'home') {
        return '/';
      } else if (breadcrumbs[0] === 'logs') {
        return '/log'; // "logs" breadcrumb links to /log page
      }
      return '/';
    }

    // Build cumulative path for deeper levels
    const pathSegments = breadcrumbs.slice(0, index + 1);

    // Build the correct URL path
    const urlSegments = pathSegments.map((segment, i) => {
      if (segment === 'logs' && i === 0) {
        return 'logs'; // Keep as 'logs' for category URLs
      }
      return segment;
    });

    return '/' + urlSegments.join('/');
  }
}
