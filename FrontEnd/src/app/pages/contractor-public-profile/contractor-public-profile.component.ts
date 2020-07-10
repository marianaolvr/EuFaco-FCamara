import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { PopupBudgetService } from "../../services/popup-budget.service";
import { Subject } from "rxjs";
import { SessionService } from "../../services/session.service";
import { ClientService } from "../../services/client.service";
import { ProviderService } from "src/app/services/provider.service";

@Component({
  selector: "app-contractor-public-profile",
  templateUrl: "./contractor-public-profile.component.html",
  styleUrls: ["./contractor-public-profile.component.css"],
})
export class ContractorPublicProfileComponent implements OnInit {
  private id: string;
  private provider: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private modalService: PopupBudgetService,
    private sessionService: SessionService,
    private clientService: ClientService,
    private providerService: ProviderService
  ) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("id");

    this.provider = {
      id: "",
      name: "",
      cep: "",
      address: "",
      service: "",
      description: "",
    };

    this.providerService.findById(this.id).subscribe(
      (success) => (this.provider = success),
      (error) => console.error(error)
    );
  }

  showPopup() {
    const result$ = this.modalService.showPopup();
    return this.signUp(result$[0], result$[1]);
  }

  signUp(user: Subject<Object>, budget: Subject<Object>) {
    return user.asObservable().subscribe(
      (client) => {
        budget.asObservable().subscribe(async (form) => {
          const res = await this.sessionService
            .clientSignUp(client)
            .toPromise();

          if (res.token) {
            return this.createBudget(form, res.token);
          }
        });
      },
      (error) => console.error(error)
    );
  }

  createBudget(budget: any, token: string) {
    return this.clientService
      .createBudget(
        {
          id_provider: this.id,
          description: budget.description,
          type_service: budget.type_service,
          time: budget.time,
        },
        this.sessionService.loadHeaders(`bearer ${token}`)
      )
      .subscribe(console.log);
  }
}
