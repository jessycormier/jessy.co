import { Component, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskComponent {
  isShown = signal(false);
  private initialized = signal(false);

  constructor(private layout: LayoutService) {
    effect(() => {
      this.isShown.set(this.layout.mask());
      // Mark as initialized after the first effect run
      if (!this.initialized()) {
        this.initialized.set(true);
      }
    });
  }

  getMaskClasses(): string {
    // If not initialized yet, ensure the mask is completely hidden
    if (!this.initialized()) {
      return 'opacity-0 pointer-events-none -z-50 fixed inset-0 max-w-full cursor-pointer bg-base-100/40 invisible';
    }

    if (this.isShown()) {
      return 'opacity-100 z-10 fixed inset-0 max-w-full cursor-pointer bg-base-100/40 transition-all duration-300';
    } else {
      return 'opacity-0 pointer-events-none -z-50 fixed inset-0 max-w-full cursor-pointer bg-base-100/40 transition-all duration-300';
    }
  }

  onClick() {
    this.layout.closeMenu();
  }
}
