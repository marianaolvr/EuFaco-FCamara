import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CepModalComponent } from "../components/cep-modal/cep-modal.component";
import { RequestFormComponent } from "../components/request-form/request-form.component";

@Injectable({
  providedIn: "root",
})
export class PopupBudgetService {
  constructor(private modelService: BsModalService) {}

  showPopup() {
    const bsModalRef: BsModalRef = this.modelService.show(RequestFormComponent);
    return [
      (<RequestFormComponent>bsModalRef.content).confirmRegister,
      (<RequestFormComponent>bsModalRef.content).confirmBudget,
    ];
  }
}
