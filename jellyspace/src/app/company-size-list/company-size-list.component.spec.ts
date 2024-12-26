import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySizeListComponent } from './company-size-list.component';

describe('CompanySizeListComponent', () => {
  let component: CompanySizeListComponent;
  let fixture: ComponentFixture<CompanySizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySizeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
