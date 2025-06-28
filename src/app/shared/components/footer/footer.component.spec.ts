import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { LinkComponent } from '../link/link.component';
import { BrandComponent } from '../brand/brand.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have social links defined', () => {
    expect(component.socialLinks).toBeDefined();
    expect(Array.isArray(component.socialLinks)).toBe(true);
    expect(component.socialLinks.length).toBeGreaterThan(0);
  });

  it('should have correct social links structure', () => {
    component.socialLinks.forEach(link => {
      expect(link.href).toBeDefined();
      expect(link.text).toBeDefined();
      expect(typeof link.href).toBe('string');
      expect(typeof link.text).toBe('string');
    });
  });

  it('should contain expected social links', () => {
    const expectedLinks = ['X', 'LinkedIn', 'GitHub'];
    const actualLinks = component.socialLinks.map(link => link.text);

    expectedLinks.forEach(expectedLink => {
      expect(actualLinks).toContain(expectedLink);
    });
  });

  it('should have valid URLs for social links', () => {
    component.socialLinks.forEach(link => {
      expect(link.href).toMatch(/^https?:\/\/.+/);
    });
  });

  it('should render LinkComponent and BrandComponent', () => {
    const linkComponents = fixture.debugElement.queryAll(By.directive(LinkComponent));
    const brandComponent = fixture.debugElement.query(By.directive(BrandComponent));

    expect(linkComponents.length).toBeGreaterThan(0);
    expect(brandComponent).toBeTruthy();
  });
});
