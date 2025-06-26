import { Component, effect } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-mask',
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
