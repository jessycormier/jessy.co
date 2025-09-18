import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-image-hover',
  imports: [CommonModule],
  templateUrl: './image-hover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageHoverComponent {
  @Input() title!: string;
  @Input() text!: string;
  @Input() rounded = false;
  @Input() showDetails = true;
}
