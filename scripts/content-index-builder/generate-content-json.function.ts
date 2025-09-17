import fs from 'fs';
import path from 'path';
import { CategoriesAndLatest, scanMarkdownFiles } from './scan-markdown.files.function';
import config from '../content-index-builder.config';

/**
 * A function that outputs json to an content.json file.
 */
export async function generateContentJson() {
  const categories = await scanMarkdownFiles(config.rootContentFolder);

  if (Object.keys(categories).length === 0) {
    console.warn('No categories found. Index file will not be created.');
    return;
  }

  // Check for ignored directories
  const allDirs = fs
    .readdirSync(config.rootContentFolder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const ignoredDirs = allDirs.filter((dir) => config.ignorePatterns.includes(dir));

  const outputPath = path.join(config.outputFolder, 'content.json');
  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2), 'utf-8');

  const logCount = categories.categories.map((x) => x.items.length).reduce((p, c) => (c || 0) + p);

  const catCount = categories.categories.length;

  // Enhanced build log output
  logDetails(logCount, catCount, outputPath, categories, ignoredDirs);
}

function logDetails(logCount: number, catCount: number, outputPath: string, categories: CategoriesAndLatest, ignoredDirs: string[]) {
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
    categories.categories.forEach((cat) => {
      const itemCount = cat.items?.length || 0;
      console.log(`   • ${cat.name.padEnd(15)} → ${itemCount.toString().padStart(2)} posts`);
    });
  }

  // Show ignored directories if any exist
  if (ignoredDirs.length > 0) {
    console.log('\n🚫 Ignored Directories:');
    ignoredDirs.forEach((dir) => {
      console.log(`   • ${dir}`);
    });
  }

  console.log('='.repeat(80) + '\n');
}

