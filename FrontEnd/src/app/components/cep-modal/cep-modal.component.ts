import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SessionService } from "src/app/services/session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-cep-modal",
  templateUrl: "./cep-modal.component.html",
  styleUrls: ["./cep-modal.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CepModalComponent implements OnInit {
  private cep: string;
  private address_city: string;

  confirmCep: Subject<string>;

  constructor(
    public bsModelRef: BsModalRef,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.confirmCep = new Subject();
  }

  getLocation() {
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
            this.address_city = success.items[0].address.city;
            this.cep = success.items[0].address.postalCode;
          },
          (error) => console.error(error)
        );
    });
  }

  onClick() {
    this.confirmCep.next(this.address_city);
    return this.onClose();
  }

  private onClose() {
    return this.bsModelRef.hide();
  }
}
