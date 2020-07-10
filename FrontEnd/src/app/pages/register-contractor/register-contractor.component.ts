import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { SessionService } from "../../services/session.service";
import { ProviderService } from "../../services/provider.service";
import { empty } from "rxjs";

@Component({
  selector: "app-register-contractor",
  templateUrl: "./register-contractor.component.html",
  styleUrls: ["./register-contractor.component.css"],
})
export class RegisterContractorComponent implements OnInit {
  private provider: any = {};
  private category: any = {};
  private token = `bearer ${localStorage.getItem("PROVIDER_TOKEN")}`;

  // ngIf para aparecer página de cadastro feito quando usuário clica em "cadastrar conta"
  contractorRegister = true;
  RegisterDone = false;

  registerDone() {
    this.contractorRegister = false;
    this.RegisterDone = true;
  }
  // fim do ngIf

  constructor(
    private sessionService: SessionService,
    private providerService: ProviderService
  ) {}

  ngOnInit() {
    this.provider = {
      name: "",
      email: "",
      cep: "",
      type_service: "",
      description: "",
      cpf: "",
      tel: "",
    };

    this.category = {
      id_category: "",
    };
  }

  private update(form: FormGroup) {
    if (form.valid) {
      return this.providerService
        .update(this.provider, this.sessionService.loadHeaders(this.token))
        .subscribe(
          (success) => this.registerDone(),
          (error) => {
            alert(`${error.error.message}`);
            empty();
          },
          () => this.insertCategory(this.category)
        );
    }
  }

  private insertCategory(category: any) {
    return this.providerService
      .createCategory(category, this.sessionService.loadHeaders(this.token))
      .subscribe(
        (success) => console.log(success),
        (error) => {
          alert(`${error.error.message}`);
          empty();
        },
        () => console.log("categoria inserida")
      );
  }
}
