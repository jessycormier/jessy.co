import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default show value as true', () => {
    expect(component.show).toBe(true);
  });

  it('should accept show input', () => {
    component.show = false;
    expect(component.show).toBe(false);
  });

  it('should emit close event when onCloseClick is called', () => {
    spyOn(component.close, 'emit');

    component.onCloseClick();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should set show to false when onCloseClick is called', () => {
    component.show = true;

    component.onCloseClick();

    expect(component.show).toBe(false);
  });

  it('should return correct value for isHidden getter', () => {
    component.show = true;
    expect(component.isHidden).toBe(false);

    component.show = false;
    expect(component.isHidden).toBe(true);
  });

  it('should apply hidden class when show is false', () => {
    component.show = false;
    fixture.detectChanges();

    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.classList.contains('hidden')).toBe(true);
  });

  it('should not apply hidden class when show is true', () => {
    component.show = true;
    fixture.detectChanges();

    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.classList.contains('hidden')).toBe(false);
  });

  it('should have close output event emitter', () => {
    expect(component.close).toBeDefined();
    expect(component.close.emit).toBeDefined();
  });

  it('should toggle visibility when show input changes', () => {
    // Start with visible
    component.show = true;
    fixture.detectChanges();
    expect(component.isHidden).toBe(false);

    // Hide the toast
    component.show = false;
    fixture.detectChanges();
    expect(component.isHidden).toBe(true);
  });
});
