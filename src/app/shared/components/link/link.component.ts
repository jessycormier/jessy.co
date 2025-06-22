import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, UrlTree } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input() routerLink!: string | any[] | UrlTree | null | undefined;
  @Input() href!: string;

  @HostBinding('attr.tabindex')
  tabindex = '0';
}
