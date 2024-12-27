import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSCMProfileComponent } from './view-profile-scm-ai.component';

describe('ViewProfileComponent', () => {
  let component: ViewSCMProfileComponent;
  let fixture: ComponentFixture<ViewSCMProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSCMProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSCMProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
