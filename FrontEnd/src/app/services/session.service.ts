import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

const apiRoutes = {
  signIn: "login",
  clientSignUp: "client",
  providerSignUp: "provider",
};

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private UriApi: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  public signIn(user: any): Observable<any> {
    const uri = `${this.UriApi}/${apiRoutes.signIn}`;
    return this.http.post(uri, user).pipe(take(1));
  }

  public clientSignUp(client: any): Observable<any> {
    const uri = `${this.UriApi}/${apiRoutes.clientSignUp}`;
    return this.http.post(uri, client);
  }

  public providerSignUp(provider: any): Observable<any> {
    const uri = `${this.UriApi}/${apiRoutes.providerSignUp}`;
    return this.http.post(uri, provider);
  }

  getLocal(lat, long, token) {
    return this.http.get(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}`,
      {
        headers: new HttpHeaders({
          Authorization: `bearer ${token}`,
        }),
      }
    );
  }

  getAddress(cep) {
    return this.http.get(
      "https://geocode.search.hereapi.com/v1/geocode?qq=postalCode=" +
        cep +
        "&apikey=QTNtYwSF3cJtw6cK6C-PNQXwjqjtvOPf28G8_MTrwvg"
    );
  }

  public loadHeaders(token: string = "") {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      Authorization: `${token}`,
    });

    return { headers };
  }
}
