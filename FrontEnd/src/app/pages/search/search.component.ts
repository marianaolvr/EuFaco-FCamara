import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpParams } from "@angular/common/http";

import { ProviderService } from "../../services/provider.service";
import { Observable } from "rxjs";
import { PopupCepService } from "src/app/services/popup-cep.service";
import { SessionService } from "src/app/services/session.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  private categorie: string;
  private address: string;
  private cep: string = "";
  private qtdProviders: number = 0;
  private providers$: Observable<any>;

  constructor(
    private activateRoute: ActivatedRoute,
    private providerService: ProviderService,
    private modalService: PopupCepService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.categorie = this.activateRoute.snapshot.paramMap.get("categorie");

    setTimeout(() => {
      this.modalService.showPopup().subscribe(
        (success) => {
          this.address = success;
          if (this.address.length > 0)
            return this.getProviders(this.categorie, this.address);
        },
        (error) => console.error(error)
      );
    }, 500);
  }

  getLocation() {
    if (this.cep.length >= 8) {
      return this.sessionService.getAddress(this.cep).subscribe(
        (success: any) => {
          this.address = success.items[0].address.city;
          console.log(this.address);
          return this.getProviders(this.categorie, this.address);
        },
        (error) => console.error(error)
      );
    }
  }

  getProviders(categorie, address) {
    this.providers$ = this.providerService.findAll({
      params: new HttpParams({
        fromString: `categorie=${categorie}&address=${address}`,
      }),
    });
    this.providers$.subscribe(
      (success) => (this.qtdProviders = success.length)
    );
  }
}
