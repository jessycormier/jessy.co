import fs from 'fs';
import path from 'path';

export function getMarkdownFiles(directory: string): string[] {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(directory, file));
}
