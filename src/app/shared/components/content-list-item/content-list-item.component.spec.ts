import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ContentListItemComponent } from './content-list-item.component';
import { ContentListItem } from '../../../content/interfaces/content-list-item.interface';
import { ComponentState } from '../../enums/component-state.enum';

describe('ContentListItemComponent', () => {
  let component: ContentListItemComponent;
  let fixture: ComponentFixture<ContentListItemComponent>;

  const mockContentItem: ContentListItem = {
    id: 'test-id',
    title: 'Test Title',
    date: '2023-01-01',
    category: 'test-category',
    path: '/test-path'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListItemComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default state as Ready', () => {
    expect(component.state()).toBe(ComponentState.Ready);
  });

  it('should accept state input', () => {
    fixture.componentRef.setInput('state', ComponentState.Loading);
    expect(component.state()).toBe(ComponentState.Loading);
  });

  it('should accept item input', () => {
    fixture.componentRef.setInput('item', mockContentItem);
    expect(component.item()).toEqual(mockContentItem);
  });

  it('should expose ComponentState enum', () => {
    expect(component.ComponentState).toBe(ComponentState);
  });

  it('should render content when item is provided', () => {
    fixture.componentRef.setInput('item', mockContentItem);
    fixture.componentRef.setInput('state', ComponentState.Ready);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should implement StatefulComponent interface', () => {
    expect(component.state).toBeDefined();
    expect(typeof component.state()).toBe('string');
  });

  describe('Ready state rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', mockContentItem);
      fixture.componentRef.setInput('state', ComponentState.Ready);
      fixture.detectChanges();
    });

    it('should display the item id', () => {
      const idElement = fixture.debugElement.query(By.css('[class*="text-vertical"] span'));
      expect(idElement.nativeElement.textContent.trim()).toBe('test-id');
    });

    it('should display the item title', () => {
      const titleElement = fixture.debugElement.query(By.css('h3'));
      expect(titleElement.nativeElement.textContent.trim()).toBe('Test Title');
    });

    it('should have clickable element with proper classes', () => {
      const clickableElement = fixture.debugElement.query(By.css('.cursor-pointer'));
      expect(clickableElement).toBeTruthy();
      expect(clickableElement.classes['group']).toBe(true);
    });

    it('should have clickable container', () => {
      const clickableElement = fixture.debugElement.query(By.css('.cursor-pointer'));
      expect(clickableElement).toBeTruthy();
    });

    it('should display arrow indicator', () => {
      const arrowElement = fixture.debugElement.query(By.css('span'));
      const arrows = fixture.debugElement.queryAll(By.css('span')).filter(
        el => el.nativeElement.textContent.includes('→')
      );
      expect(arrows.length).toBeGreaterThan(0);
    });

    it('should have proper hover effects', () => {
      const hoverElement = fixture.debugElement.query(By.css('.group'));
      expect(hoverElement.classes['group']).toBe(true);
    });
  });

  describe('Loading state rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', mockContentItem);
      fixture.componentRef.setInput('state', ComponentState.Loading);
      fixture.detectChanges();
    });

    it('should display loading skeleton', () => {
      const loadingElement = fixture.debugElement.query(By.css('[role="status"]'));
      expect(loadingElement).toBeTruthy();
    });

    it('should have animate-pulse class for loading animation', () => {
      const animatedElement = fixture.debugElement.query(By.css('.animate-pulse'));
      expect(animatedElement).toBeTruthy();
    });

    it('should display placeholder id during loading', () => {
      const placeholderElement = fixture.debugElement.query(By.css('[class*="text-vertical"] span'));
      expect(placeholderElement.nativeElement.textContent.trim()).toBe('X-0000');
    });

    it('should have sr-only loading text for accessibility', () => {
      const srElement = fixture.debugElement.query(By.css('.sr-only'));
      expect(srElement.nativeElement.textContent.trim()).toBe('Loading...');
    });

    it('should display skeleton bars', () => {
      const skeletonBars = fixture.debugElement.queryAll(By.css('.h-2\\.5'));
      expect(skeletonBars.length).toBeGreaterThan(0);
    });

    it('should have cursor-wait during loading', () => {
      const waitElement = fixture.debugElement.query(By.css('.cursor-wait'));
      expect(waitElement).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes in loading state', () => {
      fixture.componentRef.setInput('item', mockContentItem);
      fixture.componentRef.setInput('state', ComponentState.Loading);
      fixture.detectChanges();

      const statusElement = fixture.debugElement.query(By.css('[role="status"]'));
      expect(statusElement).toBeTruthy();
      expect(statusElement.attributes['role']).toBe('status');
    });

    it('should have screen reader text for loading state', () => {
      fixture.componentRef.setInput('item', mockContentItem);
      fixture.componentRef.setInput('state', ComponentState.Loading);
      fixture.detectChanges();

      const srElement = fixture.debugElement.query(By.css('.sr-only'));
      expect(srElement).toBeTruthy();
      expect(srElement.nativeElement.textContent).toBe('Loading...');
    });
  });

  describe('Component State Management', () => {
    it('should handle state changes dynamically', () => {
      fixture.componentRef.setInput('item', mockContentItem);
      fixture.componentRef.setInput('state', ComponentState.Ready);
      fixture.detectChanges();

      let readyContent = fixture.debugElement.query(By.css('h3'));
      expect(readyContent).toBeTruthy();

      fixture.componentRef.setInput('state', ComponentState.Loading);
      fixture.detectChanges();

      let loadingContent = fixture.debugElement.query(By.css('[role="status"]'));
      expect(loadingContent).toBeTruthy();
      readyContent = fixture.debugElement.query(By.css('h3'));
      expect(readyContent).toBeFalsy();
    });
  });

  describe('Item Data Handling', () => {
    it('should handle item with optional category', () => {
      const itemWithCategory: ContentListItem = {
        ...mockContentItem,
        category: 'blog'
      };

      fixture.componentRef.setInput('item', itemWithCategory);
      fixture.componentRef.setInput('state', ComponentState.Ready);
      fixture.detectChanges();

      expect(component.item().category).toBe('blog');
    });

    it('should handle item without category', () => {
      const itemWithoutCategory: ContentListItem = {
        id: 'test-2',
        title: 'Test Title 2',
        date: '2023-01-02',
        path: '/test-path-2'
      };

      fixture.componentRef.setInput('item', itemWithoutCategory);
      fixture.componentRef.setInput('state', ComponentState.Ready);
      fixture.detectChanges();

      expect(component.item().category).toBeUndefined();
    });
  });
});
