import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaTagsConfig } from '../shared/interfaces/meta-tags-config.interface';

/**
 * Service to manage meta tags for SEO and social sharing.
 * Provides methods to update tags based on a configuration object,
 *
 * @see https://stackoverflow.com/questions/77376650/how-to-solve-dynamic-meta-tags-in-angular-ssr
 */
@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private defaultConfig: MetaTagsConfig = {
    title: 'Jessy.co',
    description: "Hi, I'm Jessy welcome to my website",
    keywords: 'jessyco, jessy, developer, blog, portfolio',
    author: 'Jessy',
    image: 'https://jessy.co/assets/favicon-512x512.png',
    url: 'https://jessy.co/',
    type: 'website',
    siteName: 'Jessy.co',
    twitterCard: 'summary_large_image',
  };

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document,
  ) {}
  updateTags(config: MetaTagsConfig): void {
    const mergedConfig = { ...this.defaultConfig, ...config };

    // Update title
    if (mergedConfig.title) {
      this.title.setTitle(mergedConfig.title);
    }

    // Update canonical link
    if (mergedConfig.url) {
      this.updateCanonicalLink(mergedConfig.url);
    }

    // Update standard meta tags
    this.updateTag('name', 'description', mergedConfig.description);
    this.updateTag('name', 'keywords', mergedConfig.keywords);
    this.updateTag('name', 'author', mergedConfig.author);

    // Update Open Graph tags
    this.updateTag('property', 'og:title', mergedConfig.title);
    this.updateTag('property', 'og:description', mergedConfig.description);
    this.updateTag('property', 'og:image', mergedConfig.image);
    this.updateTag('property', 'og:url', mergedConfig.url);
    this.updateTag('property', 'og:type', mergedConfig.type);
    this.updateTag('property', 'og:site_name', mergedConfig.siteName);

    // Update Twitter Card tags
    this.updateTag('property', 'twitter:card', mergedConfig.twitterCard);
    this.updateTag('property', 'twitter:title', mergedConfig.title);
    this.updateTag('property', 'twitter:description', mergedConfig.description);
    this.updateTag('property', 'twitter:image', mergedConfig.image);
    this.updateTag('property', 'twitter:url', mergedConfig.url);

    // Update article meta tags if applicable
    if (mergedConfig.publishedDate) {
      this.updateTag('property', 'article:published_time', mergedConfig.publishedDate);
    }
    if (mergedConfig.modifiedDate) {
      this.updateTag('property', 'article:modified_time', mergedConfig.modifiedDate);
    }
    if (mergedConfig.author) {
      this.updateTag('property', 'article:author', mergedConfig.author);
    }

    // Add structured data for articles
    if (mergedConfig.type === 'article' && mergedConfig.publishedDate) {
      this.addStructuredData(mergedConfig);
    }
  }

  private addStructuredData(config: MetaTagsConfig): void {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create article structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.title,
      description: config.description,
      image: config.image,
      author: {
        '@type': 'Person',
        name: config.author || 'Jessy',
      },
      publisher: {
        '@type': 'Organization',
        name: config.siteName,
        logo: {
          '@type': 'ImageObject',
          url: 'https://jessy.co/assets/favicon-512x512.png',
        },
      },
      datePublished: config.publishedDate,
      dateModified: config.modifiedDate || config.publishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': config.url,
      },
    };

    // Add structured data script
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  private updateCanonicalLink(url: string): void {
    // Remove existing canonical link
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', url);
    this.document.head.appendChild(canonicalLink);
  }

  private updateTag(attrName: string, attrValue: string, content?: string): void {
    if (content) {
      if (this.meta.getTag(`${attrName}="${attrValue}"`)) {
        this.meta.updateTag({ [attrName]: attrValue, content });
      } else {
        this.meta.addTag({ [attrName]: attrValue, content });
      }
    }
  }

  resetToDefaults(): void {
    this.updateTags(this.defaultConfig);
  }

  generateContentMetaTags(frontmatter: any, markdown?: string): MetaTagsConfig {
    // Extract first paragraph or sentence from markdown as description
    let description = this.defaultConfig.description!;
    if (markdown) {
      // Remove markdown syntax and get first meaningful paragraph
      const cleanText = markdown
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
        .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
        .replace(/\n\s*\n/g, '\n') // Remove extra newlines
        .trim();

      const firstParagraph = cleanText.split('\n')[0];
      if (firstParagraph && firstParagraph.length > 20) {
        description = firstParagraph.length > 155 ? firstParagraph.substring(0, 155) + '...' : firstParagraph;
      }
    }

    const baseUrl = 'https://jessy.co';
    const categoryPath =
      frontmatter.category === 'blog'
        ? 'blog'
        : frontmatter.category === 'thoughts'
          ? 'thoughts'
          : frontmatter.category === 'figment-blog'
            ? 'figment-blog'
            : frontmatter.category;

    return {
      title: `${frontmatter.title} | Jessy.co`,
      description,
      keywords: `${frontmatter.title}, ${frontmatter.category}, jessyco, jessy`,
      url: `${baseUrl}/${categoryPath}/${frontmatter.id}`,
      type: 'article',
      publishedDate: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
      image: `${baseUrl}/assets/profile/profile.jpg`, // You can customize this per article if needed
    };
  }
  generateCategoryMetaTags(category: string): MetaTagsConfig {
    const categoryTitles: Record<string, string> = {
      blog: 'Blog',
      thoughts: 'Thoughts',
      'figment-blog': 'Figment Blog',
    };

    const categoryDescriptions: Record<string, string> = {
      blog: 'Technical articles, tutorials, and insights from my development journey.',
      thoughts: 'Random thoughts, ideas, and reflections on technology and life.',
      'figment-blog': 'Development updates and stories from Project Figment.',
    };

    const title = categoryTitles[category] || category;
    const description = categoryDescriptions[category] || `Browse ${title} articles and posts.`;

    return {
      title: `${title} | Jessy.co`,
      description,
      keywords: `${category}, articles, posts, jessyco, jessy`,
      url: `https://jessy.co/${category}`,
      type: 'website',
    };
  }
}
