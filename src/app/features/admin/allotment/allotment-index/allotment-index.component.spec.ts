import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentIndexComponent } from './allotment-index.component';

describe('AllotmentIndexComponent', () => {
  let component: AllotmentIndexComponent;
  let fixture: ComponentFixture<AllotmentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllotmentIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllotmentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
