import fs from 'fs';
import path from 'path';
import { processor } from './get-markdown-processor.function';
import { MarkdownItem } from './markdown-item.interface';

export function extractFrontmatter(dir: string, filePath: string): MarkdownItem | null {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const file = processor.processSync(fileContent);
  const data: any = file?.data?.['frontmatter'] || {};

  // Extract filename without extension for fallbacks
  const filename = path.basename(filePath, '.md');
  const fileStats = fs.statSync(filePath);

  // Use frontmatter values or fallbacks
  const id = data.id || '';
  const title = data.title || filename.replace(/-/g, ' ');
  // Handle date more explicitly - ensure it's a non-empty string or null
  let date = '';
  if (data.date && typeof data.date === 'string' && data.date.trim() !== '') {
    date = data.date.trim();
  }

  return {
    id,
    date,
    title,
    filename,
    path: `${dir}/${filename}`,
  };
}
