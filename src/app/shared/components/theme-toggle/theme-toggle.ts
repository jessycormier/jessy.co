import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  layout = inject(LayoutService);
}
