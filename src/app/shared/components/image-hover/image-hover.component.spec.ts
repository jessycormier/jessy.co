import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageHoverComponent } from './image-hover.component';

describe('ImageHoverComponent', () => {
  let component: ImageHoverComponent;
  let fixture: ComponentFixture<ImageHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageHoverComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageHoverComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept title input', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    expect(component.title).toBe(testTitle);
  });

  it('should accept text input', () => {
    const testText = 'Test Text';
    component.text = testText;
    expect(component.text).toBe(testText);
  });

  it('should have default rounded value as false', () => {
    expect(component.rounded).toBe(false);
  });

  it('should accept rounded input', () => {
    component.rounded = true;
    expect(component.rounded).toBe(true);
  });

  it('should have default showDetails value as true', () => {
    expect(component.showDetails).toBe(true);
  });

  it('should accept showDetails input', () => {
    component.showDetails = false;
    expect(component.showDetails).toBe(false);
  });

  it('should render with required inputs', () => {
    component.title = 'Test Title';
    component.text = 'Test Text';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
