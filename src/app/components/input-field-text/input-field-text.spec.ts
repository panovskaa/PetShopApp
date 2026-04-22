import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldText } from './input-field-text';

describe('InputFieldText', () => {
  let component: InputFieldText;
  let fixture: ComponentFixture<InputFieldText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldText],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
