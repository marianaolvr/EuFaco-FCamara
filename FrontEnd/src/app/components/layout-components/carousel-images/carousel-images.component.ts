import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-carousel-images',
  templateUrl: './carousel-images.component.html',
  styleUrls: ['./carousel-images.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselImagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
