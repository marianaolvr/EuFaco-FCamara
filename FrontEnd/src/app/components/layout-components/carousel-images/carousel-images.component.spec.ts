import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImagesComponent } from './carousel-images.component';

describe('CarouselImagesComponent', () => {
  let component: CarouselImagesComponent;
  let fixture: ComponentFixture<CarouselImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
