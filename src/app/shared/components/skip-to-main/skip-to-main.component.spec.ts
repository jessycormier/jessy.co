import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { SkipToMainComponent } from './skip-to-main.component';

describe('SkipToMainComponent', () => {
  let component: SkipToMainComponent;
  let fixture: ComponentFixture<SkipToMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipToMainComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkipToMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call focusMain method', () => {
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']);
    spyOn(component, 'focusMain');

    component.focusMain(mockEvent);

    expect(component.focusMain).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle null event in focusMain', () => {
    expect(() => component.focusMain(null as any)).not.toThrow();
  });

  it('should handle undefined event in focusMain', () => {
    expect(() => component.focusMain(undefined as any)).not.toThrow();
  });
});
