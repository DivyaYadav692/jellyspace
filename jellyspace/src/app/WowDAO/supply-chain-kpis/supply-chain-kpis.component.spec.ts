import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyChainKpisComponent } from './supply-chain-kpis.component';

describe('SupplyChainKpisComponent', () => {
  let component: SupplyChainKpisComponent;
  let fixture: ComponentFixture<SupplyChainKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyChainKpisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyChainKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
