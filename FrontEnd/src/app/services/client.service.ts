import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private UriApi: string = "http://localhost:3000/client";
  constructor(private http: HttpClient) {}

  public createBudget(body: any, opts: any): Observable<any> {
    const uri = `${this.UriApi}/budget`;

    return this.http.post(uri, body, opts);
  }

  public findAllRooms(opts: any): Observable<any> {
    const uri = `${this.UriApi}/rooms`;

    return this.http.get(uri, opts);
  }
  public find(opts: any): Observable<any> {
    return this.http.get(this.UriApi, opts);
  }
}
