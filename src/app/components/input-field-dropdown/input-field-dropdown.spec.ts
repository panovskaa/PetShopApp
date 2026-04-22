import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldDropdown } from './input-field-dropdown';

describe('InputFieldDropdown', () => {
  let component: InputFieldDropdown;
  let fixture: ComponentFixture<InputFieldDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
