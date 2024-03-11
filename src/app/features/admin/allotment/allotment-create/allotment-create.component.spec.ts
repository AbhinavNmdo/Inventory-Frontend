import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentCreateComponent } from './allotment-create.component';

describe('AllotmentCreateComponent', () => {
  let component: AllotmentCreateComponent;
  let fixture: ComponentFixture<AllotmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllotmentCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllotmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
