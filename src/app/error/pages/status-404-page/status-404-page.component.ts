import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaTagsService } from '@jc/services/meta-tags.service';

@Component({
  selector: 'app-status-404-page',
  imports: [RouterLink],
  templateUrl: './status-404-page.component.html',
})
export class Status404PageComponent implements OnInit {
  constructor(private metaTagsService: MetaTagsService) {}

  ngOnInit() {
    this.metaTagsService.updateTags({
      title: 'Page Not Found | Jessy.co',
      description: 'The page you are looking for could not be found.',
      keywords: '404, not found, error',
      type: 'website'
    });
  }
}
