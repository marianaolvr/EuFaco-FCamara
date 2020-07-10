import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProviderAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const providerToken = localStorage.getItem("PROVIDER_TOKEN") || null;
    const url = "login";
    if (providerToken != null) {
      return true;
    }
    const tree: UrlTree = this.router.parseUrl(url);
    return tree;
  }
}
