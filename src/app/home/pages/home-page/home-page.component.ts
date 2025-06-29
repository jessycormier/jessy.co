import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentListItem } from '../../../content/interfaces/content-list-item.interface';
import { ContentService } from '../../../content/services/content.service';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ComponentState } from '../../../shared/enums/component-state.enum';

@Component({
  selector: 'app-home-page',
  imports: [ContentListItemComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private contentService = inject(ContentService);
  readonly ComponentState = ComponentState;

  latestItems!: ContentListItem[];

  // Dummy item for loading placeholders
  readonly dummyItem: ContentListItem = {
    id: 'loading',
    date: '',
    title: '',
    path: '',
  };

  ngOnInit() {
    this.contentService
      .getLatest()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((contentItems) => (this.latestItems = contentItems));
  }
}
