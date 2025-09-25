import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandComponent } from '../brand/brand.component';
import { IconsModule } from '../../icon.module';

@Component({
  selector: 'app-footer',
  imports: [BrandComponent, RouterLink, IconsModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  socialLinks = [
    { href: 'https://x.com/jessycormier', text: 'X' },
    { href: 'https://www.linkedin.com/in/jessyco', text: 'LinkedIn' },
    { href: 'https://github.com/jessycormier', text: 'GitHub' },
  ];
}
