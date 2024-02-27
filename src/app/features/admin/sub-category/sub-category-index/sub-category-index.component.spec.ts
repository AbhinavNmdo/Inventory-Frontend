import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryIndexComponent } from './sub-category-index.component';

describe('SubCategoryIndexComponent', () => {
  let component: SubCategoryIndexComponent;
  let fixture: ComponentFixture<SubCategoryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCategoryIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
