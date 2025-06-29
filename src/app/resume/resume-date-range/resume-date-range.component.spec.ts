import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ResumeDateRangeComponent } from './resume-date-range.component';

describe('ResumeDateRangeComponent', () => {
  let component: ResumeDateRangeComponent;
  let fixture: ComponentFixture<ResumeDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeDateRangeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeDateRangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept start input', () => {
    const startDate = '2020-01';
    fixture.componentRef.setInput('start', startDate);
    expect(component.start()).toBe(startDate);
  });

  it('should accept end input', () => {
    const endDate = '2023-12';
    fixture.componentRef.setInput('end', endDate);
    expect(component.end()).toBe(endDate);
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('start', '2020-01');
      fixture.componentRef.setInput('end', '2023-12');
      fixture.detectChanges();
    });

    it('should display start date in first time element', () => {
      const timeElements = fixture.debugElement.queryAll(By.css('time'));
      expect(timeElements.length).toBe(2);
      expect(timeElements[0].nativeElement.textContent.trim()).toBe('2020-01');
    });

    it('should display end date in second time element', () => {
      const timeElements = fixture.debugElement.queryAll(By.css('time'));
      expect(timeElements[1].nativeElement.textContent.trim()).toBe('2023-12');
    });

    it('should display "to" separator between dates', () => {
      const separatorElement = fixture.debugElement.query(By.css('span'));
      expect(separatorElement.nativeElement.textContent.trim()).toBe('to');
    });

    it('should have proper styling classes', () => {
      const timeElements = fixture.debugElement.queryAll(By.css('time'));
      const separatorElement = fixture.debugElement.query(By.css('span'));

      timeElements.forEach(timeElement => {
        expect(timeElement.nativeElement.className).toContain('text-xs');
        expect(timeElement.nativeElement.className).toContain('text-base-content/40');
      });

      expect(separatorElement.nativeElement.className).toContain('mx-2');
      expect(separatorElement.nativeElement.className).toContain('text-xs');
      expect(separatorElement.nativeElement.className).toContain('text-base-content/40');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('start', '2020-01');
      fixture.componentRef.setInput('end', '2023-12');
      fixture.detectChanges();
    });

    it('should use semantic time elements', () => {
      const timeElements = fixture.debugElement.queryAll(By.css('time'));
      expect(timeElements.length).toBe(2);

      timeElements.forEach(timeElement => {
        expect(timeElement.name).toBe('time');
      });
    });
  });

  describe('Input validation', () => {
    it('should handle different date formats', () => {
      const formats = [
        { start: '2020', end: '2023' },
        { start: '2020-01', end: '2023-12' },
        { start: 'Jan 2020', end: 'Dec 2023' },
        { start: 'Present', end: 'Current' }
      ];

      formats.forEach(({ start, end }) => {
        fixture.componentRef.setInput('start', start);
        fixture.componentRef.setInput('end', end);
        fixture.detectChanges();

        const timeElements = fixture.debugElement.queryAll(By.css('time'));
        expect(timeElements[0].nativeElement.textContent.trim()).toBe(start);
        expect(timeElements[1].nativeElement.textContent.trim()).toBe(end);
      });
    });
  });
});
