import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentListItemComponent } from '../../../shared/components/content-list-item/content-list-item.component';
import { ContentListItem } from '../../interfaces/content-list-item.interface';
import { ContentList } from '../../interfaces/content-list.interface';

@Component({
  selector: 'app-content-list-page',
  imports: [ContentListItemComponent],
  templateUrl: './content-list-page.component.html',
})
export default class ContentListPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  items: ContentListItem[] = [];

  ngOnInit() {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Partial<ContentList>) => {
        this.items = data['items'] || [];
      });
  }
}
