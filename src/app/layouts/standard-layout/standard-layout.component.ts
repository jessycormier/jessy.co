import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'app-standard-layout',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './standard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardLayoutComponent implements OnInit {
  nowYear = new Date().getFullYear();
  protected layout = inject(LayoutService);
  protected isLoaded = signal(false);

  ngOnInit() {
    // Use setTimeout to ensure the component is fully initialized
    setTimeout(() => {
      this.isLoaded.set(true);
    }, 0);
  }

  onDrawerToggle(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.layout.openMenu();
    } else {
      this.layout.closeMenu();
    }
  }
}
