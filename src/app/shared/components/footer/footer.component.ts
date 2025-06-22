import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrandComponent } from '../brand/brand.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, LinkComponent, BrandComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  siteLinks = [
    { routerLink: '/', text: 'Home' },
    { routerLink: '/thought', text: 'Thought' },
    { routerLink: '/resume', text: 'Resume' },
  ];

  socialLinks = [
    { href: 'https://x.com/jessycormier', text: 'X ( Twitter )' },
    { href: 'https://www.linkedin.com/in/jessyco', text: 'LinkedIn' },
    // { href: 'https://bsky.app/profile/jessy.co', text: 'Bluesky' },
    { href: 'https://github.com/jessycormier', text: 'GitHub' },
  ];
}
