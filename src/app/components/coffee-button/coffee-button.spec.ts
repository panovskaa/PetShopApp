import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeButton } from './coffee-button';

describe('CoffeeButton', () => {
  let component: CoffeeButton;
  let fixture: ComponentFixture<CoffeeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
