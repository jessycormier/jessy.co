import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ContentListItemComponent } from './content-list-item.component';
import { ContentListItem } from '../../../content/interfaces/content-list-item.interface';
import { ComponentState } from '../../enums/component-state.enum';

describe('ContentListItemComponent', () => {
  let component: ContentListItemComponent;
  let fixture: ComponentFixture<ContentListItemComponent>;

  const mockContentItem: ContentListItem = {
    id: 'test-id',
    title: 'Test Title',
    date: '2023-01-01',
    category: 'test-category',
    path: '/test-path'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListItemComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default state as Ready', () => {
    expect(component.state()).toBe(ComponentState.Ready);
  });

  it('should accept state input', () => {
    fixture.componentRef.setInput('state', ComponentState.Loading);
    expect(component.state()).toBe(ComponentState.Loading);
  });

  it('should accept item input', () => {
    fixture.componentRef.setInput('item', mockContentItem);
    expect(component.item()).toEqual(mockContentItem);
  });

  it('should expose ComponentState enum', () => {
    expect(component.ComponentState).toBe(ComponentState);
  });

  it('should render content when item is provided', () => {
    fixture.componentRef.setInput('item', mockContentItem);
    fixture.componentRef.setInput('state', ComponentState.Ready);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should implement StatefulComponent interface', () => {
    expect(component.state).toBeDefined();
    expect(typeof component.state()).toBe('string');
  });
});
