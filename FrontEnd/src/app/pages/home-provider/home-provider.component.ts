import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { ProviderService } from "src/app/services/provider.service";
import { SessionService } from "src/app/services/session.service";
import io from "socket.io-client";
import { Router } from "@angular/router";
@Component({
  selector: "app-home-provider",
  templateUrl: "./home-provider.component.html",
  styleUrls: ["./home-provider.component.css"],
})
export class HomeProviderComponent implements OnInit {
  private clients$: Observable<any>;
  private id_provider: string;
  private socket: any;
  private token = `bearer ${localStorage.getItem("PROVIDER_TOKEN")}`;

  constructor(
    private providerService: ProviderService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clients$ = this.providerService.findAllBudgets(
      this.sessionService.loadHeaders(this.token)
    );

    this.providerService
      .find(this.sessionService.loadHeaders(this.token))
      .subscribe(
        (success) => (this.id_provider = success.id),
        (error) => console.error(error)
      );

    this.socket = io("http://localhost:3000/room");
  }

  sendRoom(id_client) {
    const room = {
      name_room: `${id_client}@${this.id_provider}`,
      id_client,
      id_provider: this.id_provider,
    };
    this.socket.emit("new_room", room);
    return this.router.navigate([`messages-prestador/${room.name_room}`]);
  }
}
