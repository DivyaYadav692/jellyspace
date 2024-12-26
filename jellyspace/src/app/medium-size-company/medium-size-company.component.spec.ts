import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumSizeCompanyComponent } from './medium-size-company.component';

describe('MediumSizeCompanyComponent', () => {
  let component: MediumSizeCompanyComponent;
  let fixture: ComponentFixture<MediumSizeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumSizeCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumSizeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
