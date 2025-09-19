/**
 * Simple glob pattern matcher without external dependencies
 * Supports basic glob patterns commonly used in .gitignore files
 */
export function matchesGlobPattern(path: string, pattern: string): boolean {
  // Handle exact matches first
  if (pattern === path) {
    return true;
  }

  // Convert glob pattern to regex
  const regexPattern = globToRegex(pattern);
  const regex = new RegExp(regexPattern);

  return regex.test(path);
}

/**
 * Convert a glob pattern to a regular expression
 */
function globToRegex(pattern: string): string {
  // Handle ** (match any number of directories) first
  if (pattern.startsWith('**/')) {
    const remainder = pattern.substring(3); // Remove **/
    const escapedRemainder = remainder
      .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape special regex chars
      .replace(/\*/g, '[^/]*') // Convert * to match anything except /
      .replace(/\?/g, '[^/]'); // Convert ? to match single char except /

    // Match at start or after any directory separator
    return '^(' + escapedRemainder + '|.*/' + escapedRemainder + ')$';
  }

  // Escape special regex characters and convert glob patterns
  let regexPattern = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape special regex chars
    .replace(/\*/g, '[^/]*') // Convert * to match anything except /
    .replace(/\?/g, '[^/]'); // Convert ? to match single char except /

  // For patterns with explicit paths, match exactly
  if (pattern.includes('/')) {
    regexPattern = '^' + regexPattern + '$';
  } else {
    // For simple patterns, match as basename or full path
    regexPattern = '^(' + regexPattern + '|.*/' + regexPattern + ')$';
  }

  return regexPattern;
}

/**
 * Check if a path should be ignored based on an array of glob patterns
 */
export function shouldIgnorePath(path: string, ignorePatterns: string[]): boolean {
  return ignorePatterns.some(pattern => matchesGlobPattern(path, pattern));
}
