import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSortingButtonComponent } from './table-sorting-button.component';

describe('TableSortingButtonComponent', () => {
  let component: TableSortingButtonComponent;
  let fixture: ComponentFixture<TableSortingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSortingButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSortingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
