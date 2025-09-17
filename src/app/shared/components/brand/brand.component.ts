import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  templateUrl: './brand.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
  enableText = input<boolean>(true);
}
