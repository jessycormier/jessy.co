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
