import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  templateUrl: './brand.component.html',
  styles: [],
})
export class BrandComponent {
  size = input<'' | 'sm'>('');
}
