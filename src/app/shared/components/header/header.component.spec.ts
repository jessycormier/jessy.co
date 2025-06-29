import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

import { HeaderComponent } from './header.component';
import { LayoutService } from '../../services/layout.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { BrandComponent } from '../brand/brand.component';
import { LinkComponent } from '../link/link.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(async () => {
    const layoutServiceSpy = jasmine.createSpyObj('LayoutService', ['toggleMenu', 'closeMenu'], {
      menu: signal(false),
      mask: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: LayoutService, useValue: layoutServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject LayoutService', () => {
    expect(component.layout).toBe(layoutService);
  });

  it('should render BrandComponent', () => {
    const brandComponent = fixture.debugElement.query(By.directive(BrandComponent));
    expect(brandComponent).toBeTruthy();
  });

  it('should render LinkComponent', () => {
    const linkComponents = fixture.debugElement.queryAll(By.directive(LinkComponent));
    expect(linkComponents.length).toBeGreaterThan(0);
  });

  it('should render ThemeToggle', () => {
    const themeToggle = fixture.debugElement.query(By.directive(ThemeToggle));
    expect(themeToggle).toBeTruthy();
  });

  it('should have access to layout service signals', () => {
    expect(component.layout.menu).toBeDefined();
    expect(component.layout.mask).toBeDefined();
  });
});
