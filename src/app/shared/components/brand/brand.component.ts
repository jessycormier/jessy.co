import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand.component.html',
  styles: [],
})
export class BrandComponent {
  @Input() size: '' | 'sm' = '';
}
