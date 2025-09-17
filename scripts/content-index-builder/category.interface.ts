import { MarkdownItem } from './markdown-item.interface';

export interface Category {
  name: string;
  path: string;
  count: number;
  items: MarkdownItem[];
}
