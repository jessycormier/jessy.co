import { Injectable } from '@angular/core';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import yaml from 'yaml';

@Injectable({
  providedIn: 'root',
})
export class UnifiedService {
  private processor;

  constructor() {
    this.processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml'])
      .use(() => (tree, file) => {
        let frontmatterData = {};

        // Find and extract the frontmatter node
        visit(tree, 'yaml', (node: any, index: any, parent: any) => {
          try {
            frontmatterData = yaml.parse(node.value) || {}; // Parse YAML into JSON object
          } catch (error) {
            console.error('Error parsing frontmatter:', error);
          }

          // Remove frontmatter node from the markdown AST
          if (parent && typeof index === 'number') {
            parent.children.splice(index, 1);
          }
        });

        (file.data as any).frontmatter = frontmatterData; // Store JSON frontmatter in file data
      })
      .use(remarkStringify);
  }

  parseMarkdown(markdown: string) {
    const file = this.processor.processSync(markdown);
    return {
      frontmatter: (file.data as any).frontmatter || {}, // Extracted JSON frontmatter
      markdown: String(file), // Clean markdown without frontmatter
    };
  }
}
