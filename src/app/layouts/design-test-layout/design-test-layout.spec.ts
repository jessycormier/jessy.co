import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignTestLayout } from './design-test-layout';

describe('DesignTestLayout', () => {
  let component: DesignTestLayout;
  let fixture: ComponentFixture<DesignTestLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignTestLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignTestLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
