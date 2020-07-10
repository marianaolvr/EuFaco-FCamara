import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CepModalComponent } from "../components/cep-modal/cep-modal.component";

@Injectable({
  providedIn: "root",
})
export class PopupCepService {
  constructor(private modelService: BsModalService) {}

  showPopup() {
    const bsModalRef: BsModalRef = this.modelService.show(CepModalComponent);
    return (<CepModalComponent>bsModalRef.content).confirmCep;
  }
}
