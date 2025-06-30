import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-resume-date-range',
  imports: [],
  templateUrl: './resume-date-range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeDateRangeComponent {
  start = input.required<string>();
  end = input.required<string>();
}
