import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {Message} from "../../../models/message.model";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((data: Message[]) => {
      this.messages = data;
    });

    this.chatService.messageReceived().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    const message: Message = {
      text: this.newMessage,
      timestamp: new Date()
    };

    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(message).subscribe((data: Message) => {
        this.messages.push(data);
      });
    }
  }
}
