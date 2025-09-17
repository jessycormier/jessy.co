import fs from 'fs';
import config from '../content-index-builder.config';

export function getSubdirectories(rootDir: string): string[] {
  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dirName) => !config.ignorePatterns.includes(dirName));
}
