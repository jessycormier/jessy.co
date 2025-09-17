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

  // Enhanced build log output
  console.log('\n' + '='.repeat(80));
  console.log('📊 CONTENT INDEX GENERATION COMPLETE');
  console.log('='.repeat(80));
  console.log(`📝 Total Posts:      ${logCount.toString().padStart(3)} posts`);
  console.log(`📁 Total Categories: ${catCount.toString().padStart(3)} categories`);
  console.log(`📍 Output Location:  ${outputPath}`);
  console.log(`⏰ Generated At:     ${new Date().toLocaleString()}`);

  // Category breakdown
  if (categories.categories.length > 0) {
    console.log('\n📋 Category Breakdown:');
    categories.categories.forEach(cat => {
      const itemCount = cat.items?.length || 0;
      console.log(`   • ${cat.name.padEnd(15)} → ${itemCount.toString().padStart(2)} posts`);
    });
  }

  console.log('='.repeat(80) + '\n');
}
