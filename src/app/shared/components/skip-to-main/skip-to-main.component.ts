import { DOCUMENT } from '@angular/common';
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skip-to-main',
  templateUrl: './skip-to-main.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipToMainComponent {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  focusMain(event: Event) {
    event?.preventDefault();
    this.doc?.querySelector('main')?.focus();
  }
}
