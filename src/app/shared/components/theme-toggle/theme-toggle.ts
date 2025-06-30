import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IconsModule } from '../../icon.module';

@Component({
  selector: 'app-theme-toggle',
  imports: [IconsModule],
  templateUrl: './theme-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggle {
  themeService = inject(ThemeService);
}
