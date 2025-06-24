import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../content/services/content.service';
import { ContentListItem } from '../../../content/interfaces/content-list-item.interface';
import { MetaTagsService } from '../../../services/meta-tags.service';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ComponentState } from '../../../shared/enums/component-state.enum';

@Component({
  selector: 'app-home-page',
  imports: [ContentListItemComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  ComponentState = ComponentState; // expose enum to html template.

  latestItems!: ContentListItem[];

  constructor(
    private contentService: ContentService,
    private metaTagsService: MetaTagsService
  ) {}

  ngOnInit() {
    // Set home page meta tags
    this.metaTagsService.updateTags({
      title: 'Jessy.co - Developer, Builder, Learner',
      description:
        "Hi, I'm Jessy welcome to my website. I write about development, share thoughts, and document my journey building tools.",
      keywords:
        'jessyco, jessy, developer, blog, portfolio, angular, typescript, web development',
      url: 'https://jessy.co/',
      type: 'website',
    });

    this.contentService
      .getLatest()
      .subscribe((contentItems) => (this.latestItems = contentItems));
  }
}
