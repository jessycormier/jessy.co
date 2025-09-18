import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-center-layout',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './center-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterLayoutComponent {}
