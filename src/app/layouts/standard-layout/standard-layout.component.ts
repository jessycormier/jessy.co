import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-standard-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './standard-layout.component.html',
})
export class StandardLayoutComponent {
  nowYear = new Date().getFullYear();
  protected layout = inject(LayoutService);

  onDrawerToggle(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.layout.openMenu();
    } else {
      this.layout.closeMenu();
    }
  }
}
