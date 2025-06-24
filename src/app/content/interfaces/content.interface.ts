export interface Content {
  frontmatter: {
    id: string;
    title: string;
    date: string;
    category: string;
    aiEditor?: boolean;
  };
  markdown: string;
}
