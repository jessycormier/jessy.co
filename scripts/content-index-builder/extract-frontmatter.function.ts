import fs from 'fs';
import path from 'path';
import { processor } from './get-markdown-processor.function';
import { MarkdownItem } from './markdown-item.interface';

export function extractFrontmatter(dir: string, filePath: string): MarkdownItem | null {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const file = processor.processSync(fileContent);
  const data: any = file?.data?.['frontmatter'];

  // Here's where I would change the "required" fields in order for the scanning to work or not.
  if (data.id && data.date && data.title) {
    return {
      id: data.id,
      date: data.date,
      title: data.title,
      path: `${dir}/${path.basename(filePath).replace('.md', '')}`,
    };
  }
  return null;
}
