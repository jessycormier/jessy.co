import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightService } from '../word-highlight.service';
import { ResumeWordComponent } from './resume-word.component';

describe('ResumeWordComponent', () => {
  let component: ResumeWordComponent;
  let fixture: ComponentFixture<ResumeWordComponent>;
  let highlightService: HighlightService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeWordComponent],
      providers: [HighlightService],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeWordComponent);
    component = fixture.componentInstance;
    highlightService = TestBed.inject(HighlightService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept value input', () => {
    const testValue = 'test-word';
    fixture.componentRef.setInput('value', testValue);
    expect(component.value()).toBe(testValue);
  });

  it('should have default underline input as true', () => {
    expect(component.underline()).toBe(true);
  });

  it('should accept underline input', () => {
    fixture.componentRef.setInput('underline', false);
    expect(component.underline()).toBe(false);
  });

  describe('Host bindings', () => {
    it('should apply underline class when underline is true', () => {
      fixture.componentRef.setInput('underline', true);
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains('underline')).toBe(true);
    });

    it('should not apply underline class when underline is false', () => {
      fixture.componentRef.setInput('underline', false);
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains('underline')).toBe(false);
    });

    it('should apply highlight class when word is selected', () => {
      const testValue = 'highlighted-word';
      fixture.componentRef.setInput('value', testValue);

      // Simulate the word being selected
      highlightService.selectedWord.set(testValue);
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains('highlight')).toBe(true);
    });

    it('should not apply highlight class when word is not selected', () => {
      const testValue = 'not-highlighted-word';
      fixture.componentRef.setInput('value', testValue);

      // Simulate a different word being selected
      highlightService.selectedWord.set('different-word');
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains('highlight')).toBe(false);
    });
  });

  describe('Mouse interaction', () => {
    it('should handle mouseup event and select word', () => {
      const testValue = 'clickable-word';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      // Initially no word is selected
      expect(highlightService.selectedWord()).toBeUndefined();

      // Click the word
      const mouseEvent = new MouseEvent('mouseup');
      fixture.nativeElement.dispatchEvent(mouseEvent);

      expect(highlightService.selectedWord()).toBe(testValue);
    });

    it('should deselect word when clicking the same word again', () => {
      const testValue = 'toggle-word';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      // First set the word as selected
      highlightService.selectedWord.set(testValue);
      expect(highlightService.selectedWord()).toBe(testValue);

      // Click the same word again
      const mouseEvent = new MouseEvent('mouseup');
      fixture.nativeElement.dispatchEvent(mouseEvent);

      expect(highlightService.selectedWord()).toBeUndefined();
    });
  });

  describe('Content projection', () => {
    it('should project content correctly', () => {
      const testContent = '<span>Test Content</span>';

      const testFixture = TestBed.createComponent(ResumeWordComponent);
      testFixture.nativeElement.innerHTML = testContent;
      testFixture.detectChanges();

      expect(testFixture.nativeElement.innerHTML).toContain('Test Content');
    });
  });

  describe('Reactivity', () => {
    it('should update highlight signal when selectedWord changes', () => {
      const testValue = 'reactive-word';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      // Initially not highlighted
      expect(component.highlight()).toBe(false);

      // Select the word
      highlightService.selectedWord.set(testValue);
      fixture.detectChanges();

      expect(component.highlight()).toBe(true);

      // Deselect the word
      highlightService.selectedWord.set(undefined);
      fixture.detectChanges();

      expect(component.highlight()).toBe(false);
    });

    it('should handle undefined values correctly', () => {
      fixture.componentRef.setInput('value', undefined);
      fixture.detectChanges();

      highlightService.selectedWord.set('some-word');
      fixture.detectChanges();

      expect(component.highlight()).toBe(false);
    });
  });
});
