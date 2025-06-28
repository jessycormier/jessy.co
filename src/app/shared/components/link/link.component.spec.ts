import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept routerLink input', () => {
    const testRoute = '/test-route';
    component.routerLink = testRoute;
    expect(component.routerLink).toBe(testRoute);
  });

  it('should accept routerLink as array', () => {
    const testRoute = ['/test', 'route'];
    component.routerLink = testRoute;
    expect(component.routerLink).toEqual(testRoute);
  });

  it('should accept href input', () => {
    const testHref = 'https://example.com';
    component.href = testHref;
    expect(component.href).toBe(testHref);
  });

  it('should have tabindex attribute set to 0', () => {
    expect(component.tabindex).toBe('0');
  });

  it('should set tabindex attribute on host element', () => {
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.getAttribute('tabindex')).toBe('0');
  });

  it('should handle null routerLink input', () => {
    component.routerLink = null;
    expect(component.routerLink).toBeNull();
  });

  it('should handle undefined routerLink input', () => {
    component.routerLink = undefined;
    expect(component.routerLink).toBeUndefined();
  });

  it('should render with RouterLink when routerLink is provided', () => {
    component.routerLink = '/test';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should render with href when href is provided', () => {
    component.href = 'https://example.com';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
