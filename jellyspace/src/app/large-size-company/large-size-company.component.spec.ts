import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeSizeCompanyComponent } from './large-size-company.component';

describe('LargeSizeCompanyComponent', () => {
  let component: LargeSizeCompanyComponent;
  let fixture: ComponentFixture<LargeSizeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeSizeCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeSizeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
