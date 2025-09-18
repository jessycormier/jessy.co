import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-footer',
  imports: [LinkComponent],
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
