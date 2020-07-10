import { Injectable } from "@angular/core";

import * as io from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private socketMsg: any;
  private socketCall: any;
  private server = "http://localhost:3000";

  constructor() {
    this.socketMsg = io("http://localhost:3000/chat");
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socketMsg.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socketMsg.emit(eventName, data);
  }
}
