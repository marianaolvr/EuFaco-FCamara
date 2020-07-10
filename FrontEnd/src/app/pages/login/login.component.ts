import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { SessionService } from "../../services/session.service";
import { empty } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private user: any = {};

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.user = {
      email: "",
      password: "",
    };
  }
  private signin(form: FormGroup) {
    const typeUser = this.activateRoute.snapshot.paramMap.get("user");

    if (typeUser === "cliente" && form.valid) {
      const client = {
        user: 0,
        email: this.user.email,
        password: this.user.password,
      };

      return this.sessionService.signIn(client).subscribe(
        (success) => {
          localStorage.setItem("CLIENT_TOKEN", success.token);
          this.router.navigate(["home-cliente"]);
        },
        (error) => {
          alert(`LOGIN:${error.error.login}`);
          empty();
        }
      );
    } else if (typeUser === "prestador" && form.valid) {
      const provider = {
        user: 1,
        email: this.user.email,
        password: this.user.password,
      };

      return this.sessionService.signIn(provider).subscribe(
        (success) => {
          localStorage.setItem("PROVIDER_TOKEN", success.token);
          this.router.navigate(["home-prestador"]);
        },
        (error) => {
          alert(`LOGIN:${error.error.login}`);
          empty();
        }
      );
    }
  }
}
