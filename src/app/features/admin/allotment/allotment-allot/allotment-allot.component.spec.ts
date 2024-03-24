import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentAllotComponent } from './allotment-allot.component';

describe('AllotmentAllotComponent', () => {
  let component: AllotmentAllotComponent;
  let fixture: ComponentFixture<AllotmentAllotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllotmentAllotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllotmentAllotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
