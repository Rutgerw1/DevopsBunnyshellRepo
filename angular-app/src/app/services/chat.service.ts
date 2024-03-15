import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WebSocketSubject} from "rxjs/webSocket";
import {Observable} from "rxjs";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl: string = 'http://localhost:3550/api/chat';
  private socket$: WebSocketSubject<Message>;

  constructor(private http: HttpClient) {
    this.socket$ = new WebSocketSubject('ws://localhost:3550/ws');
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, message);
  }

  messageReceived(): Observable<Message> {
    return this.socket$.asObservable();
  }
}
