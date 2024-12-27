import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBusinessListComponent } from './category-business-list.component';

describe('CategoryBusinessListComponent', () => {
  let component: CategoryBusinessListComponent;
  let fixture: ComponentFixture<CategoryBusinessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBusinessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
