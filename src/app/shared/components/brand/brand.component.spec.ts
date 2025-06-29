import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { BrandComponent } from './brand.component';

// Create a dummy component for routing
@Component({
  template: '<div>Test Component</div>',
})
class TestComponent {}

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let router: Router;

  // Helper method to set component size input
  const setComponentSize = (size: '' | 'sm') => {
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandComponent, TestComponent],
      providers: [
        provideRouter([
          { path: '', component: TestComponent },
          { path: '**', redirectTo: '' }
        ])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default size (empty string)', () => {
    beforeEach(() => {
      setComponentSize('');
    });

    it('should have default size as empty string', () => {
      expect(component.size()).toBe('');
    });

    it('should render large brand logo with correct dimensions', () => {
      const logoDiv = fixture.debugElement.query(By.css('.h-10.w-10'));
      expect(logoDiv).toBeTruthy();
      expect(logoDiv.nativeElement.textContent.trim()).toBe('JC');
    });

    it('should render brand text with correct styling', () => {
      const brandSpans = fixture.debugElement.queryAll(By.css('span span'));
      expect(brandSpans.length).toBe(3);
      expect(brandSpans[0].nativeElement.textContent).toBe('jessy');
      expect(brandSpans[1].nativeElement.textContent).toBe('.');
      expect(brandSpans[2].nativeElement.textContent).toBe('co');
    });

    it('should have correct opacity classes for brand text', () => {
      const brandSpans = fixture.debugElement.queryAll(By.css('span span'));
      expect(
        brandSpans[0].nativeElement.classList.contains('opacity-70')
      ).toBeTruthy();
      expect(
        brandSpans[1].nativeElement.classList.contains('opacity-40')
      ).toBeTruthy();
      expect(
        brandSpans[2].nativeElement.classList.contains('opacity-70')
      ).toBeTruthy();
    });
  });

  describe('Small size', () => {
    beforeEach(() => {
      setComponentSize('sm');
    });

    it('should render small brand logo with correct dimensions', () => {
      const logoDiv = fixture.debugElement.query(By.css('.h-6.w-6'));
      expect(logoDiv).toBeTruthy();
      expect(logoDiv.nativeElement.textContent.trim()).toBe('JC');
    });

    it('should render brand text with small text styling', () => {
      const brandSpan = fixture.debugElement.query(By.css('.text-sm'));
      expect(brandSpan).toBeTruthy();

      const brandSpans = brandSpan.queryAll(By.css('span'));
      expect(brandSpans.length).toBe(3);
      expect(brandSpans[0].nativeElement.textContent).toBe('jessy');
      expect(brandSpans[1].nativeElement.textContent).toBe('.');
      expect(brandSpans[2].nativeElement.textContent).toBe('co');
    });

    it('should have group class on small size brand text', () => {
      const brandSpan = fixture.debugElement.query(By.css('.group'));
      expect(brandSpan).toBeTruthy();
    });
  });

  describe('RouterLink functionality', () => {
    it('should have routerLink pointing to root', () => {
      const linkElement = fixture.debugElement.query(By.css('a[routerLink]'));
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.getAttribute('routerLink')).toBe('/');
    });

    it('should navigate when clicked', async () => {
      spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

      const linkElement = fixture.debugElement.query(By.css('a[routerLink]'));
      linkElement.nativeElement.click();

      await fixture.whenStable();
      expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should have correct CSS classes on link element', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(
        linkElement.nativeElement.classList.contains('inline-flex')
      ).toBeTruthy();
      expect(
        linkElement.nativeElement.classList.contains('items-center')
      ).toBeTruthy();
      expect(
        linkElement.nativeElement.classList.contains('text-center')
      ).toBeTruthy();
      expect(
        linkElement.nativeElement.classList.contains('font-mono')
      ).toBeTruthy();
    });
  });

  describe('Input property', () => {
    it('should accept empty string as size', () => {
      setComponentSize('');
      expect(component.size()).toBe('');
    });

    it('should accept "sm" as size', () => {
      setComponentSize('sm');
      expect(component.size()).toBe('sm');
    });

    it('should update template when size changes', () => {
      // Start with default size
      setComponentSize('');
      let largeDiv = fixture.debugElement.query(By.css('.h-10.w-10'));
      let smallDiv = fixture.debugElement.query(By.css('.h-6.w-6'));
      expect(largeDiv).toBeTruthy();
      expect(smallDiv).toBeFalsy();

      // Change to small size
      setComponentSize('sm');
      largeDiv = fixture.debugElement.query(By.css('.h-10.w-10'));
      smallDiv = fixture.debugElement.query(By.css('.h-6.w-6'));
      expect(largeDiv).toBeFalsy();
      expect(smallDiv).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a link', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.tagName.toLowerCase()).toBe('a');
    });

    it('should maintain focus behavior', () => {
      const linkElement = fixture.debugElement.query(By.css('a'));
      linkElement.nativeElement.focus();
      expect(document.activeElement).toBe(linkElement.nativeElement);
    });
  });
});
