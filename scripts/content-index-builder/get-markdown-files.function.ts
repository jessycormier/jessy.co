import fs from 'fs';
import path from 'path';
import config from '../content-index-builder.config';
import { shouldIgnorePath } from './glob-matcher.function';

export function getMarkdownFiles(directory: string): string[] {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => !shouldIgnorePath(file, config.ignorePatterns))
    .map((file) => path.join(directory, file));
}
