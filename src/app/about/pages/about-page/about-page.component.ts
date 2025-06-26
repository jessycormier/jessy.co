import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@Component({
  selector: 'app-about-page',
  imports: [NgxTypedWriterModule, MarkdownModule],
  templateUrl: './about-page.component.html',
})
export default class AboutPageComponent implements OnInit {
  profileImage = 'assets/profile/profile.jpg';
  iAm!: string[];

  ngOnInit() {
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
      'a thinker',
      'a problem solver',
      'a builder',
      'a explorer',
      'a creator',
    ]);
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
