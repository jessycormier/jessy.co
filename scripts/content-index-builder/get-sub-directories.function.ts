import fs from 'fs';
import config from '../content-index-builder.config';
import { shouldIgnorePath } from './glob-matcher.function';

export function getSubdirectories(rootDir: string): string[] {
  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dirName) => !shouldIgnorePath(dirName, config.ignorePatterns));
}
