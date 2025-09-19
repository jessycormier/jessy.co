import path from 'path';
import { Category } from './category.interface';
import { extractFrontmatter } from './extract-frontmatter.function';
import { getMarkdownFiles } from './get-markdown-files.function';
import { getSubdirectories } from './get-sub-directories.function';
import { MarkdownItem } from './markdown-item.interface';
import config from '../content-index-builder.config';


export interface CategoriesAndLatest {
  categories: Category[];
  latest?: MarkdownItem[];
}

export async function scanMarkdownFiles(rootDir: string): Promise<CategoriesAndLatest> {
  const categories: Category[] = [];
  const subDirs = getSubdirectories(rootDir);
  let allItems: MarkdownItem[] = [];

  // Handle root folder files (categorize as 'log')
  const rootFiles = getMarkdownFiles(rootDir);
  if (rootFiles.length > 0) {
    const routePath = config.LOG_ROUTE || 'log';
    const rootItems = rootFiles.map((filePath) => extractFrontmatter(routePath, filePath)).filter(Boolean) as MarkdownItem[];
    allItems = allItems.concat(rootItems);

    categories.push({
      name: 'log',
      path: routePath,
      count: rootItems.length,
      items: rootItems.sort((a, b) => {
        // Sort by filename alphabetically for regular category items
        return a.filename.localeCompare(b.filename);
      }),
    });
  }

  // Handle subdirectory files (categorize by folder name)
  for (const subdir of subDirs) {
    const dirPath = path.join(rootDir, subdir);
    const files = getMarkdownFiles(dirPath);
    const routePath = config.ROOT_ROUTE + '/' + subdir;
    const name = subdir.replace(/-/g, ' ');

    const items = files.map((filePath) => extractFrontmatter(routePath, filePath)).filter(Boolean) as MarkdownItem[];
    allItems = allItems.concat(items);

    categories.push({
      name: name,
      path: routePath,
      count: items.length,
      items: items.sort((a, b) => {
        // Sort by filename alphabetically for regular category items
        return a.filename.localeCompare(b.filename);
      }),
    });
  }
  // For "latest" items, keep the date-based sorting (when date is available)
  const sortedItems = allItems.sort((a, b) => {
    // If both have dates, sort by date (newest first)
    if (a.date && b.date) {
      return b.date.localeCompare(a.date);
    }
    // If only one has a date, prioritize the one with date
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    // If neither has date, sort by filename
    return a.filename.localeCompare(b.filename);
  });

  return {
    categories,
    latest: sortedItems.slice(0, config.latestAmount),
  } as CategoriesAndLatest;
}
