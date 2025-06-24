import { ContentListItem } from './content-list-item.interface';

export interface ContentList {
  items: ContentListItem[];
  category: string;
}
