import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
})
export class TagComponent {
  @Input() category!: string;
}
