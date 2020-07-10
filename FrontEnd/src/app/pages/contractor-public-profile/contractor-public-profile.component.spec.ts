import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPublicProfileComponent } from './contractor-public-profile.component';

describe('ContractorPublicProfileComponent', () => {
  let component: ContractorPublicProfileComponent;
  let fixture: ComponentFixture<ContractorPublicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorPublicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
