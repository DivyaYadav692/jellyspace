import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHandlerDetailsComponent } from './account-handler-details.component';

describe('AccountHandlerDetailsComponent', () => {
  let component: AccountHandlerDetailsComponent;
  let fixture: ComponentFixture<AccountHandlerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHandlerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountHandlerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
