import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutService } from './services/layout.service';
import { MetaTagsService } from './services/meta-tags.service';
import { of } from 'rxjs';

describe('App', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;
  let mockMetaTagsService: jasmine.SpyObj<MetaTagsService>;

  beforeEach(async () => {
    // Create spies for dependencies
    mockRouter = jasmine.createSpyObj('Router', ['navigate'], {
      events: of(), // Mock the events observable
      url: '/'
    });

    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      firstChild: null,
      snapshot: { data: {} }
    });

    mockLayoutService = jasmine.createSpyObj('LayoutService', ['setTheme']);
    mockMetaTagsService = jasmine.createSpyObj('MetaTagsService', ['updateTags']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: MetaTagsService, useValue: mockMetaTagsService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
