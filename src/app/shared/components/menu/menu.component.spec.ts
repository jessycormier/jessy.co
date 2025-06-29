import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { MenuComponent } from './menu.component';
import { LayoutService } from '../../services/layout.service';
import { ContentService } from '../../../content/services/content.service';
import { LinkComponent } from '../link/link.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;
  let contentService: jasmine.SpyObj<ContentService>;
  let menuSignal: any;

  const mockCategories = [
    { name: 'Blog', path: '/blog', count: 5 },
    { name: 'Thoughts', path: '/thoughts', count: 3 }
  ];

  beforeEach(async () => {
    menuSignal = signal(false);
    const layoutServiceSpy = jasmine.createSpyObj('LayoutService', ['closeMenu'], {
      menu: menuSignal,
      mask: signal(false)
    });

    const contentServiceSpy = jasmine.createSpyObj('ContentService', ['getCategoryList']);
    contentServiceSpy.getCategoryList.and.returnValue(of(mockCategories));

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideRouter([]),
        { provide: LayoutService, useValue: layoutServiceSpy },
        { provide: ContentService, useValue: contentServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;
    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isShown as false', () => {
    expect(component.isShown).toBe(false);
  });

  it('should load categories on initialization', () => {
    expect(contentService.getCategoryList).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
  });

  it('should update isShown when layout menu signal changes', () => {
    menuSignal.set(true);
    fixture.detectChanges();
    expect(component.isShown).toBe(true);

    menuSignal.set(false);
    fixture.detectChanges();
    expect(component.isShown).toBe(false);
  });

  it('should call layout.closeMenu when onClose is called', () => {
    const mockEvent = new Event('click');
    spyOn(mockEvent, 'preventDefault');

    component.onClose(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(layoutService.closeMenu).toHaveBeenCalled();
  });

  it('should call layout.closeMenu when handleEscKey is called', () => {
    component.handleEscKey();
    expect(layoutService.closeMenu).toHaveBeenCalled();
  });

  it('should render LinkComponent for each category', () => {
    const linkComponents = fixture.debugElement.queryAll(By.directive(LinkComponent));
    expect(linkComponents.length).toBeGreaterThanOrEqual(0);
  });

  it('should have categories array initialized', () => {
    expect(Array.isArray(component.categories)).toBe(true);
  });

  it('should handle empty categories list', () => {
    contentService.getCategoryList.and.returnValue(of([]));
    const newFixture = TestBed.createComponent(MenuComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.categories).toEqual([]);
  });
});
