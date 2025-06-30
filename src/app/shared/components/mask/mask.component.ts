import { Component, effect, signal } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
})
export class MaskComponent {
  isShown = signal(false);

  constructor(private layout: LayoutService) {
    effect(() => {
      this.isShown.set(this.layout.mask());
    });
  }

  onClick() {
    this.layout.closeMenu();
  }
}
