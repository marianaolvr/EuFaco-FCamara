import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private http: Http) {}

  getLocal(cep) {
    return this.http
      .get(
        "https://geocode.search.hereapi.com/v1/geocode?qq=postalCode=" +
          cep +
          "&apikey=QTNtYwSF3cJtw6cK6C-PNQXwjqjtvOPf28G8_MTrwvg"
      )
      .map((response: Response) => response.json());
  }
}
