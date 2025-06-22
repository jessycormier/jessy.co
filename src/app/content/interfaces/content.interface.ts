import { ContentCategory } from '../enum/content-category.enum';
import { ContentRouteData } from './content-route-data.interface';

export interface Content extends ContentRouteData {
  frontmatter: {
    id: string;
    title: string;
    date: string;
    category: ContentCategory;
    aiEditor?: boolean;
    description?: string;
    keywords?: string;
    image?: string;
  };
  markdown: string;
}
