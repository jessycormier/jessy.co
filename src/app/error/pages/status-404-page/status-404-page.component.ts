import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-status-404-page',
  imports: [RouterLink],
  templateUrl: './status-404-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Status404PageComponent {}
