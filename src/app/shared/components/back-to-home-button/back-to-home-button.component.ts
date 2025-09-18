import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../icon.module';

@Component({
  selector: 'app-back-to-home-button',
  imports: [RouterLink, IconsModule],
  templateUrl: './back-to-home-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToHomeButtonComponent {}
