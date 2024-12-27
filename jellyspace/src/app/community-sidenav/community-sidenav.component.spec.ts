import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySidenavComponent } from './community-sidenav.component';

describe('CommunitySidenavComponent', () => {
  let component: CommunitySidenavComponent;
  let fixture: ComponentFixture<CommunitySidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitySidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
