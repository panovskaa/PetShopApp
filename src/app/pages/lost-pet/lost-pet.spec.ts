import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPet } from './lost-pet';

describe('LostPet', () => {
  let component: LostPet;
  let fixture: ComponentFixture<LostPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPet],
    }).compileComponents();

    fixture = TestBed.createComponent(LostPet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
