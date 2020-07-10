import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";

@Component({
  selector: "app-request-form",
  templateUrl: "./request-form.component.html",
  styleUrls: ["./request-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFormComponent implements OnInit {
  private budget: Object = {};
  private user: Object = {};
  private step1: boolean = true;
  private step2: boolean = false;
  private step3: boolean = false;
  private step4: boolean = false;

  confirmRegister: Subject<Object>;
  confirmBudget: Subject<Object>;

  constructor(
    public bsModelRef: BsModalRef,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.confirmRegister = new Subject();
    this.confirmBudget = new Subject();

    this.budget = {
      description: "",
      type_service: "",
      time: "",
    };

    this.user = {
      name: "",
      email: "",
      cep: "",
      password: "",
    };
  }
  nextStep2() {
    this.step1 = false;
    this.step2 = true;
  }

  backStep1() {
    this.step1 = true;
    this.step2 = false;
  }

  nextStep3() {
    this.step2 = false;
    this.step3 = true;
  }

  backStep2() {
    this.step3 = false;
    this.step2 = true;
  }

  nextStep4() {
    this.step3 = false;
    this.step4 = true;
  }

  register(form: FormGroup) {
    if (form.valid) {
      this.confirmRegister.next(this.user);
      this.confirmBudget.next(this.budget);
      return this.nextStep4();
    }
  }

  private onClose() {
    return this.bsModelRef.hide();
  }
  private onCloseNavigate() {
    this.router.navigate(["home-prestador"]);
    return this.bsModelRef.hide();
  }
}
