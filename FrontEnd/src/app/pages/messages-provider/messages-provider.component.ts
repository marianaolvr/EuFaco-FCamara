import { Component, OnInit } from "@angular/core";
import { ProviderService } from "src/app/services/provider.service";
import { SessionService } from "src/app/services/session.service";
import { Router, ActivatedRoute } from "@angular/router";
import { WebsocketService } from "src/app/services/websocket.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-messages-provider",
  templateUrl: "./messages-provider.component.html",
  styleUrls: ["./messages-provider.component.css"],
})
export class MessagesProviderComponent implements OnInit {
  private token = `bearer ${localStorage.getItem("PROVIDER_TOKEN")}`;
  private clients$: Observable<any>;
  private chatName: string;
  private providerName: string;
  private clientName: string = "";
  private myMsg: string;
  private messages: any = [];

  constructor(
    private providerService: ProviderService,
    private sessionService: SessionService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private webSocket: WebsocketService
  ) {}

  ngOnInit() {
    this.chatName = this.activateRoute.snapshot.paramMap.get("chat");

    this.webSocket.emit("join_room", this.chatName);

    this.providerService
      .find(this.sessionService.loadHeaders(this.token))
      .subscribe(
        (success) => (this.providerName = success.name),
        (error) => console.error(error)
      );

    this.clients$ = this.providerService.findAllRooms(
      this.sessionService.loadHeaders(this.token)
    );

    this.webSocket.listen("message").subscribe((data) => {
      this.appendMessage(data);
    });
  }
  onClick(name_room, clientName) {
    this.router.navigate([`mensagens-prestador/${name_room}`]);
    this.clientName = clientName;
  }

  sendMessage() {
    const msg = {
      name_room: this.chatName,
      msg_provider: this.myMsg,
    };
    this.webSocket.emit("conversation", msg);
  }

  appendMessage(msg) {
    if (msg.msg_provider) {
      this.messages.push({ msg_provider: msg.msg_provider });
    }
    if (msg.msg_client) {
      this.messages.push({ msg_client: msg.msg_client });
    }
  }
}
