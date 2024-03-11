import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentReturnComponent } from './allotment-return.component';

describe('AllotmentReturnComponent', () => {
  let component: AllotmentReturnComponent;
  let fixture: ComponentFixture<AllotmentReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllotmentReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllotmentReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
