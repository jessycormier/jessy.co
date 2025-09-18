import { Component, inject, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ContentListItem } from '../../interfaces/content-list-item.interface';
import { ContentList } from '../../interfaces/content-list.interface';

@Component({
  selector: 'app-content-list-page',
  imports: [ContentListItemComponent],
  templateUrl: './content-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentListPageComponent {
  private route = inject(ActivatedRoute);

  // Convert route data and params to signals
  private routeData = toSignal(this.route.data, { initialValue: {} });
  private routeParams = toSignal(this.route.paramMap, { initialValue: null });

  items = signal<ContentListItem[]>([]);
  category = signal<string>('');

  constructor() {
    // Use effect to reactively update when route data or params change
    effect(() => {
      const data = this.routeData();
      const paramMap = this.routeParams();

      if (paramMap) {
        // Get category from current route parameters
        const categoryParam = paramMap.get('category') || '';
        this.category.set(categoryParam);

        // Handle the case where data might be directly the items array (from original resolver)
        // or an object with items and category (from new resolver)
        if (Array.isArray(data)) {
          this.items.set(data);
        } else {
          const items = Array.isArray((data as any)?.['items']) ? (data as any)['items'] : [];
          this.items.set(items);
        }
      }
    });
  }
}
