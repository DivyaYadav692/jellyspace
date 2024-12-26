import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserRegisterComponent } from './new-user-register.component';

describe('NewUserRegisterComponent', () => {
  let component: NewUserRegisterComponent;
  let fixture: ComponentFixture<NewUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
