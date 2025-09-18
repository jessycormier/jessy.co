import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-status-500-page',
  imports: [RouterLink],
  templateUrl: './status-500-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Status500PageComponent {

}
