import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

import { SessionService } from "../../services/session.service";
import { empty } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  private client: any = {};
  private provider: any = {};

  clientRegister = true;
  RegisterDone = false;

  constructor(private sessionService: SessionService, private router: Router) {}

  registerDone() {
    this.clientRegister = false;
    this.RegisterDone = true;
  }
  ngOnInit() {
    this.client = {
      name: "",
      email: "",
      password: "",
      cep: "",
      address_city: "",
    };

    this.provider = {
      name: "",
      email: "",
      password: "",
      cep: "",
      address_city: "",
    };
  }

  private getLocation(user) {
    return navigator.geolocation.getCurrentPosition((p) => {
      const latitude = p.coords.latitude;
      const longitude = p.coords.longitude;
      return this.sessionService
        .getLocal(
          latitude,
          longitude,
          "eyJhbGciOiJSUzUxMiIsImN0eSI6IkpXVCIsImlzcyI6IkhFUkUiLCJhaWQiOiJncnlYRFcxYXN1WDBPd3R5SlRnZCIsImlhdCI6MTU5NDIzMjMyNiwiZXhwIjoxNTk0MzE4NzI2LCJraWQiOiJqMSJ9.ZXlKaGJHY2lPaUprYVhJaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuLm9kdXhTUVFLQk5JTVJteEo5SzdwOFEuNWhsd0l3aFBJaU5kWUxQRnhKREpOelVDYkhCQnNieS1pbkZ4OHFoSFExd0FfUGZabkFpU2tDM2puaG5PY1ZYUXNkZlNDZ2FKZEFveThkNEFyY2JFTmFSYlV2S0FBdkxISjlYZVEyNlU3eXhSMHRodGQwS2lEM3FOMDVBd3RwVWQud01fd2tUNFlyVnA1NldxMEhQU25PaXZFdlBtc0Fud0NlVGMzS0Z6dnJnVQ.mA1dUtJ-tN3wQE3EOx1P2WEkA10bW_WBQnRb1kxHUx4tGcCXIbvEBUWoorbgdIPq1rOgelWl8lOi_0hq35cXCvfZZhqQw-bIRhcCfbX_Eztu2qW-qiEvAEf3YVXqx8Ks19KbejmTz_uIl7yMqxctpxVfnJ9yPuEmSy-Ywd3QuYlX0Xf0ca_v8-VD3qa1mAHTYG7ZmqJlxF_uDjZYr2t0i8099Z4CvoAgyg7wz4JDQht_aWx_-FW39vYeXTpYDmJJOKdVziyM-BvEpDZzbfWyfR6iQyAGlq9iN-ZifNKXyT_2nDezE1EAKQUO1K-DpkEwCep0lLv6Uh5vKSKgYY3WUQ"
        )
        .subscribe(
          (success: any) => {
            if (user.name === "clientName") {
              this.client.address_city = success.items[0].address.city;
              this.client.cep = success.items[0].address.postalCode;
              console.log(this.client);
            } else {
              this.provider.address_city = success.items[0].address.city;
              this.provider.cep = success.items[0].address.postalCode;
              console.log(this.provider);
            }
          },
          (error) => console.error(error)
        );
    });
  }

  private clientSignUp(clientForm: FormGroup) {
    if (clientForm.valid) {
      return this.sessionService.clientSignUp(this.client).subscribe(
        (success) => {
          localStorage.setItem("CLIENT_TOKEN", success.token);
          this.registerDone();
        },
        (error) => {
          alert(`${error.error.message}`);
          empty();
        }
      );
    }
  }

  private providerSignUp(providerForm: FormGroup) {
    if (providerForm.valid) {
      return this.sessionService.providerSignUp(this.provider).subscribe(
        (success) => {
          localStorage.setItem("PROVIDER_TOKEN", success.token);
          this.router.navigate(["cadastro-prestador"]);
        },
        (error) => {
          alert(`${error.error.message}`);
          empty();
        }
      );
    }
  }
}
