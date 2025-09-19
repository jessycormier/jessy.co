import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ContentListItem } from '../../interfaces/content-list-item.interface';
import { ContentService } from '../../services/content.service';
import { LinkComponent } from "../../../shared/components/link/link.component";
import { IconsModule } from '../../../shared/icon.module';

@Component({
  selector: 'app-content-list-page',
  imports: [ContentListItemComponent, RouterLink, LinkComponent, IconsModule],
  templateUrl: './content-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentListPageComponent {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);

  // Convert route data and params to signals
  private routeData = toSignal(this.route.data, { initialValue: {} });
  private routeParams = toSignal(this.route.paramMap, { initialValue: null });

  items = signal<ContentListItem[]>([]);
  category = signal<string>('');
  categories = signal<Array<{ name: string; path: string; count: number }>>([]);
  isRootLogPage = signal<boolean>(false);

  constructor() {
    // Use effect to reactively update when route data or params change
    effect(() => {
      const data = this.routeData();
      const paramMap = this.routeParams();

      if (paramMap) {
        // Get category from current route parameters
        const categoryParam = paramMap.get('category') || '';
        this.category.set(categoryParam);

        // Check if we're on the root log page (no category parameter)
        const isRoot = !categoryParam && this.route.snapshot.routeConfig?.path === 'log';
        this.isRootLogPage.set(isRoot);

        // Load categories if we're on the root log page
        if (isRoot) {
          this.loadCategories();
        }

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

  private loadCategories() {
    this.contentService.getCategoryList().subscribe({
      next: (categoryList) => {
        // Filter out the 'log' category itself and only show subcategories
        const filteredCategories = categoryList.filter((cat) => cat.path !== 'log');
        this.categories.set(filteredCategories);
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
        this.categories.set([]);
      },
    });
  }
}
