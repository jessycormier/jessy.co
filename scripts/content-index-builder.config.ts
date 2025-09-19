export default {
  rootContentFolder: './public/content',
  outputFolder: './public',
  ROOT_ROUTE: 'logs', // Base route for all categories used to output the path for use on the website.
  LOG_ROUTE: 'log', // Special route for root folder files
  latestAmount: 10,
  ignorePatterns: [
    '.obsidian',
    'assets',
    '.git',
    'node_modules',
    '.DS_Store',
    'Thumbs.db',
    '**/_*',
    '_*'
  ]
};
