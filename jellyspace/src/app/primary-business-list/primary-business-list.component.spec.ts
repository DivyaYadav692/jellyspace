import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryBusinessListComponent } from './primary-business-list.component';

describe('PrimaryBusinessListComponent', () => {
  let component: PrimaryBusinessListComponent;
  let fixture: ComponentFixture<PrimaryBusinessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryBusinessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryBusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
