import { Component, OnInit, afterNextRender, inject, ElementRef, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from './shared/services/layout.service';
import { MetaTagsService } from './shared/services/meta-tags.service';
import { MaskComponent } from './shared/components/mask/mask.component';
import { SkipToMainComponent } from './shared/components/skip-to-main/skip-to-main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SkipToMainComponent, MaskComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private elementRef = inject(ElementRef);
  isLoaded = signal(false);

  constructor(
    public layout: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaTagsService: MetaTagsService,
  ) {
    afterNextRender(() => {
      // Trigger fade-in animation after the app has rendered
      this.elementRef.nativeElement.classList.add('app-loaded');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.add('app-fully-loaded');
        this.isLoaded.set(true);
      }, 100); // Match this duration with your CSS transition duration
    });
  }

  ngOnInit() {
    // Listen for route changes and update meta tags from route data
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      let route = this.activatedRoute;

      while (route.firstChild) {
        route = route.firstChild;
      }

      const metaData = route.snapshot.data?.['meta'];

      if (metaData) {
        this.metaTagsService.updateTags({
          title: metaData.title,
          description: metaData.description,
          keywords: metaData.keywords,
          url: `https://jessy.co${this.router.url}`,
          type: metaData.type || 'website',
        });
      }
    });
  }
}
