import fs from 'fs';
import path from 'path';
import { scanMarkdownFiles } from './scan-markdown.files.function';

/**
 * A function that outputs json to an index.json file.
 */
export async function generateIndexFile(rootDir: string) {
  const categories = await scanMarkdownFiles(rootDir);

  if (Object.keys(categories).length === 0) {
    console.warn('No categories found. Index file will not be created.');
    return;
  }

  const outputPath = path.join(rootDir, 'index.json');
  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2), 'utf-8');

  const logCount = categories.categories
    .map((x) => x.items.length)
    .reduce((p, c) => (c || 0) + p);

  const catCount = categories.categories.length;
  console.log(
    `||| Total Logs: ${logCount} | Total Categories: ${catCount} | Index file updated/created at: ${outputPath}`
  );
}
