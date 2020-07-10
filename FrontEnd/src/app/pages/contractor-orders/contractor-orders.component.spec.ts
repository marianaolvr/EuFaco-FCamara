import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorOrdersComponent } from './contractor-orders.component';

describe('ContractorOrdersComponent', () => {
  let component: ContractorOrdersComponent;
  let fixture: ComponentFixture<ContractorOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
