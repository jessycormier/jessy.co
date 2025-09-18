import { Component, inject, SecurityContext, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule, MarkdownService, SANITIZE } from 'ngx-markdown';
import { LinkComponent } from '../../../shared/components/link/link.component';
import { Content } from '../../interfaces/content.interface';

@Component({
  imports: [MarkdownModule, RouterLink, LinkComponent],
  providers: [
    MarkdownService,
    { provide: SANITIZE, useValue: SecurityContext.HTML },
  ],
  templateUrl: './content-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentPageComponent {
  private route = inject(ActivatedRoute);

  data!: Content;
  id!: string;
  date!: string;
  title!: string;
  category!: string;
  aiEditor = false;
  markdown!: string;

  constructor() {
    this.route.data.subscribe((data) => {
      this.data = data['content'] as Content;
      this.id = this.data.frontmatter.id;
      this.date = this.data.frontmatter.date;
      this.title = this.data.frontmatter.title;
      this.category = this.data.frontmatter.category;
      this.aiEditor = this.data.frontmatter.aiEditor ?? false;
      this.markdown = this.data.markdown;
    });
  }
}
