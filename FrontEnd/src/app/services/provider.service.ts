import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  private UriApi: string = "http://localhost:3000/provider";

  constructor(private http: HttpClient) {}

  public update(body: any, opts: any): Observable<any> {
    return this.http.patch(this.UriApi, body, opts);
  }

  public find(opts: any): Observable<any> {
    return this.http.get(this.UriApi, opts);
  }

  public createCategory(body: any, opts: any): Observable<any> {
    const uri = `${this.UriApi}/categorie`;

    return this.http.post(uri, body, opts);
  }

  public findAll(opts: any): Observable<any> {
    const uri = `${this.UriApi}/categories`;
    return this.http.get(uri, opts);
  }

  public findById(id: string): Observable<any> {
    return this.http.get(`${this.UriApi}/${id}`);
  }

  public findAllBudgets(opts: any): Observable<any> {
    return this.http.get("http://localhost:3000/budgets", opts);
  }

  public findAllRooms(opts: any): Observable<any> {
    return this.http.get("http://localhost:3000/rooms", opts);
  }
}
