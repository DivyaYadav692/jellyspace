import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsLinkComponent } from './accounts-link.component';

describe('AccountsLinkComponent', () => {
  let component: AccountsLinkComponent;
  let fixture: ComponentFixture<AccountsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
