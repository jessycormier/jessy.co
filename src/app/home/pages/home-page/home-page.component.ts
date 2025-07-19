import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
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

  latestItems = signal<ContentListItem[]>([]);
  isLoading = signal(true);
  hasError = signal(false);

  // Dummy item for loading placeholders
  readonly dummyItem: ContentListItem = {
    id: 'loading',
    date: '',
    title: '',
    path: '',
  };

  ngOnInit() {
    this.loadLatestItems();
  }

  private loadLatestItems() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.contentService
      .getLatest()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (contentItems) => {
          this.latestItems.set(contentItems);
          this.isLoading.set(false);

          // If we got an empty array, it might be due to an error that was handled gracefully
          if (contentItems.length === 0) {
            console.warn('No latest items loaded - this might indicate a loading issue');
          }
        },
        error: (error) => {
          console.error('Failed to load latest items:', error);
          this.isLoading.set(false);
          this.hasError.set(true);
          // Keep empty array as fallback
          this.latestItems.set([]);
        }
      });
  }

  retryLoading() {
    this.loadLatestItems();
  }
}
