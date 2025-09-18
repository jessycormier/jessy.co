import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-status-418-page',
  imports: [RouterLink],
  templateUrl: './status-418-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Status418PageComponent {}
