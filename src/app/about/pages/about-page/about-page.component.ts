import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { MetaTagsService } from '../../../services/meta-tags.service';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule, NgxTypedWriterModule, MarkdownModule],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit {
  profileImage = 'assets/profile/profile.jpg';

  iAm!: string[];
  constructor(private metaTagsService: MetaTagsService) {
    this.iAm = this.shuffleArray([
      'a web developer',
      'a photographer',
      'a teacher',
      'a father',
      'a learner',
      'a tinkerer',
      'a music listener',
      'a move watcher',
      'a nature walker',
      'a reader',
      'a gamer',
      'a friend',
      'a husband',
      'a explorer',
      'a creator',
    ]);
  }

  ngOnInit() {
    // Set about page meta tags
    this.metaTagsService.updateTags({
      title: 'About Jessy | Jessy.co',
      description:
        'Learn more about Jessy - a web developer, photographer, teacher, father, and lifelong learner passionate about building tools and sharing knowledge.',
      keywords: 'about jessy, web developer, photographer, teacher, portfolio, biography',
      url: 'https://jessy.co/about',
      type: 'profile',
      image: 'https://jessy.co/assets/profile/profile.jpg',
    });
  }

  /**
   * @see https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
   */
  shuffleArray(arr: any[]) {
    return arr
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }
}
