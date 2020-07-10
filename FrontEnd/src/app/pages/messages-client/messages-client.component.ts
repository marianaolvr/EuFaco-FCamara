import { Component, OnInit } from "@angular/core";
import { ClientService } from "src/app/services/client.service";
import { SessionService } from "src/app/services/session.service";
import { Observable, from } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { WebsocketService } from "src/app/services/websocket.service";

@Component({
  selector: "app-messages-client",
  templateUrl: "./messages-client.component.html",
  styleUrls: ["./messages-client.component.css"],
})
export class MessagesClientComponent implements OnInit {
  private token = `bearer ${localStorage.getItem("CLIENT_TOKEN")}`;
  private providers$: Observable<any>;
  private clientName: string;
  private providerName: string = "";
  private chatName: string;
  private myMsg: string;
  private messages: any = [];

  constructor(
    private clientService: ClientService,
    private sessionService: SessionService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private webSocket: WebsocketService
  ) {}

  ngOnInit() {
    this.chatName = this.activateRoute.snapshot.paramMap.get("chat");
    this.webSocket.emit("join_room", this.chatName);

    this.clientService
      .find(this.sessionService.loadHeaders(this.token))
      .subscribe(
        (success) => (this.clientName = success.name),
        (error) => console.error(error)
      );

    this.providers$ = this.clientService.findAllRooms(
      this.sessionService.loadHeaders(this.token)
    );

    this.webSocket.listen("message").subscribe((data) => {
      this.appendMessage(data);
    });
  }

  onClick(name_room, providerName) {
    this.router.navigate([`mensagens-cliente/${name_room}`]);
    this.providerName = providerName;
  }

  sendMessage() {
    const msg = {
      name_room: this.chatName,
      msg_client: this.myMsg,
    };
    this.webSocket.emit("conversation", msg);
  }

  appendMessage(msg: any) {
    if (msg.msg_client) {
      this.messages.push({ msg_client: msg.msg_client });
    }
    if (msg.msg_provider) {
      this.messages.push({ msg_provider: msg.msg_provider });
    }
  }
}
