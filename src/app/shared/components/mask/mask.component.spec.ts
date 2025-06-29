import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { MaskComponent } from './mask.component';
import { LayoutService } from '../../services/layout.service';

describe('MaskComponent', () => {
  let component: MaskComponent;
  let fixture: ComponentFixture<MaskComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;
  let maskSignal: any;

  beforeEach(async () => {
    maskSignal = signal(false);
    const layoutServiceSpy = jasmine.createSpyObj('LayoutService', ['closeMenu'], {
      mask: maskSignal,
      menu: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [MaskComponent],
      providers: [
        { provide: LayoutService, useValue: layoutServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MaskComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isShown as false', () => {
    expect(component.isShown).toBe(false);
  });

  it('should update isShown when layout mask signal changes', () => {
    maskSignal.set(true);
    fixture.detectChanges();
    expect(component.isShown).toBe(true);

    maskSignal.set(false);
    fixture.detectChanges();
    expect(component.isShown).toBe(false);
  });

  it('should call layout.closeMenu when onClick is called', () => {
    component.onClick();
    expect(layoutService.closeMenu).toHaveBeenCalled();
  });

  it('should respond to mask signal changes through effect', () => {
    // Initial state
    expect(component.isShown).toBe(false);

    // Change signal value
    maskSignal.set(true);
    fixture.detectChanges();

    // Component should reflect the change
    expect(component.isShown).toBe(true);
  });

  it('should have LayoutService injected', () => {
    expect(layoutService).toBeTruthy();
    expect(layoutService.closeMenu).toBeDefined();
  });
});
