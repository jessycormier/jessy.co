import {
  Component,
  effect,
  input,
  signal,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HighlightService } from '../word-highlight.service';

@Component({
  selector: 'app-resume-word',
  templateUrl: './resume-word.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.underline]': 'underline()',
    '[class.highlight]': 'highlight()',
    '(mouseup)': 'onMouseUp($event)',
  },
})
export class ResumeWordComponent {
  value = input<string>();
  underline = input(true);
  highlight = signal(false);

  private highlightService = inject(HighlightService);

  constructor() {
    effect(() => {
      this.highlight.set(this.highlightService.selectedWord() === this.value());
    });
  }

  onMouseUp(e: Event) {
    e.preventDefault();
    const currentValue = this.value();
    this.highlightService.selectedWord.set(
      this.highlightService.selectedWord() === currentValue
        ? undefined
        : currentValue
    );
  }
}
6;
