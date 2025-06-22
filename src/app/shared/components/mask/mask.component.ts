import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-mask',
  imports: [CommonModule],
  templateUrl: './mask.component.html',
})
export class MaskComponent {
  isShown = false;

  constructor(private layout: LayoutService) {
    effect(() => {
      this.isShown = this.layout.mask();
    });
  }

  onClick() {
    this.layout.closeMenu();
  }
}
