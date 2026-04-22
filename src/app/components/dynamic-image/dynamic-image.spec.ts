import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicImage } from './dynamic-image';

describe('DynamicImage', () => {
  let component: DynamicImage;
  let fixture: ComponentFixture<DynamicImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicImage],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
