import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ContentListItem } from '../../interfaces/content-list-item.interface';
import { ContentList } from '../../interfaces/content-list.interface';

@Component({
  selector: 'app-content-list-page',
  imports: [ContentListItemComponent],
  templateUrl: './content-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentListPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  items: ContentListItem[] = [];
  category: string = '';

  ngOnInit() {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        // Handle the case where data might be directly the items array (from original resolver)
        // or an object with items and category (from new resolver)
        if (Array.isArray(data)) {
          this.items = data;
          this.category = this.route.snapshot.paramMap.get('category') || '';
        } else {
          this.items = Array.isArray(data?.items) ? data.items : [];
          this.category = data?.category || this.route.snapshot.paramMap.get('category') || '';
        }
      });
  }
}
