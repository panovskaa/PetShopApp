import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingComponent } from './create-listing';

describe('CreateListingComponent', () => {
  let component: CreateListingComponent;
  let fixture: ComponentFixture<CreateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
