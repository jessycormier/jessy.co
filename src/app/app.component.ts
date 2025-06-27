import { Component, OnInit, afterNextRender, inject, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from './shared/services/layout.service';
import { MetaTagsService } from './shared/services/meta-tags.service';
import { MaskComponent } from './shared/components/mask/mask.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SkipToMainComponent } from './shared/components/skip-to-main/skip-to-main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SkipToMainComponent, MaskComponent, MenuComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private elementRef = inject(ElementRef);

  constructor(
    public layout: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaTagsService: MetaTagsService
  ) {
    afterNextRender(() => {
      // Trigger fade-in animation after the app has rendered
      this.elementRef.nativeElement.classList.add('app-loaded');
    });
  }

  ngOnInit() {
    // Listen for route changes and update meta tags from route data
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
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
