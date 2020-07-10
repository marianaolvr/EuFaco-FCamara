import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContractorComponent } from './register-contractor.component';

describe('RegisterContractorComponent', () => {
  let component: RegisterContractorComponent;
  let fixture: ComponentFixture<RegisterContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
