import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaTagsService } from '../../../services/meta-tags.service';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ContentListItem } from '../../interfaces/content-list-item.interface';
import { ContentList } from '../../interfaces/content-list.interface';

@Component({
  selector: 'app-content-list-page',
  imports: [ContentListItemComponent],
  templateUrl: './content-list-page.component.html',
})
export class ContentListPageComponent {
  category!: string;
  items: ContentListItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private metaTagsService: MetaTagsService,
  ) {
    this.route.data.subscribe((data: Partial<ContentList>) => {
      this.category = data.category || '';
      this.items = data.items || [];

      // Update meta tags for this category
      if (this.category) {
        const metaConfig = this.metaTagsService.generateCategoryMetaTags(this.category);
        this.metaTagsService.updateTags(metaConfig);
      }
    });
  }
}
