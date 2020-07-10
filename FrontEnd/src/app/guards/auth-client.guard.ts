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
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const clientToken = localStorage.getItem("CLIENT_TOKEN") || null;
    const url = "login";
    if (clientToken != null) {
      return true;
    }
    const tree: UrlTree = this.router.parseUrl(url);
    return tree;
  }
}
