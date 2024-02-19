import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ChatService } from '../../_service/chat.service';
import { EMPTY } from 'rxjs';
import { ChatResponse, Message } from '../../_model/chat-response.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ChatRequest } from '../../_model/chat-request';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
  ],
})
export class MessagesComponent implements OnInit {
  userName: string = '';
  chats: ChatResponse[] = [];
  loadedChat: ChatResponse;
  loaderChatUserName: string = '';
  messages: Message[] | null;
  //for forms
  public newMessage: string = '';
  public newChat: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}
  public ngOnInit() {
    this.userName = this.authService.getUserName();
    this.loadChats();
  }

  public getEmailInitial(chat: ChatResponse): string {
    return this.getCorrectUserNameFromChat(chat).charAt(0).toUpperCase();
  }

  public getEmailInitial2(userName: string): string {
    return userName.charAt(0).toUpperCase();
  }

  public getUserName(chat: ChatResponse): string {
    return this.getCorrectUserNameFromChat(chat);
  }

  private getCorrectUserNameFromChat(chat: ChatResponse): string {
    return this.userName == chat.firstUserName
      ? chat.secondUserName
      : chat.firstUserName;
  }

  public openChat(chat: ChatResponse) {
    this.loadMessages(chat.chatId);
    this.loadedChat = chat;
    this.loaderChatUserName = this.getUserName(chat);
  }

  public sendMessage(chatId: number) {
    const message: Message = {
      id: 0,
      senderEmail: this.userName,
      createdTime: new Date(),
      replyMessage: this.newMessage,
      chatId: this.loadedChat.chatId,
    };

    this.chatService
      .sendMessage(message)
      .then((result) => {
        if (result) {
          this.loadMessages(this.loadedChat.chatId);
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          console.log('POST 403 Forbidden');
        } else if (error.status === 401) {
          console.log('POST 401 Unauthorized');
        } else {
          alert('Wystąpił błąd: ' + error.message);
        }

        return EMPTY;
      });
  }

  public loadChats() {
    this.chatService
      .getChatsForUser(this.userName)
      .then((result: ChatResponse[]) => {
        if (result) {
          this.chats = result;
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          console.log('POST 403 Forbidden');
        } else if (error.status === 401) {
          console.log('POST 401 Unauthorized');
        } else {
          alert('Wystąpił błąd: ' + error.message);
        }

        return EMPTY;
      });
  }

  public loadMessages(chatId: number) {
    this.chatService
      .getChatById(chatId)
      .then((result: ChatResponse) => {
        if (result) {
          this.messages = result.messageList;
          console.log(this.messages);
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          console.log('POST 403 Forbidden');
        } else if (error.status === 401) {
          console.log('POST 401 Unauthorized');
        } else {
          alert('Wystąpił błąd: ' + error.message);
        }

        return EMPTY;
      });
  }

  public createChat() {
    let foundChat: ChatResponse | null = null;

    this.chats.forEach((chat) => {
      if (this.getCorrectUserNameFromChat(chat) === this.newChat) {
        foundChat = chat;
        return;
      }
    });

    if (foundChat !== null) {
      this.openChat(foundChat);
    } else {
      let chatRequest: ChatRequest | null = null;

      // Zakładając, że ChatRequest ma pola firstName i secondName
      chatRequest = {
        firstUserName: this.userName,
        secondUserName: this.newChat,
      };

      this.chatService
        .createChat(chatRequest)
        .then((result) => {
          if (result) {
            this.loadMessages(this.loadedChat.chatId);
            this.loadChats();
          }
        })
        .catch((error) => {
          if (error.status === 400) {
            console.log('POST 400 Bad request');
          } else {
            alert('Wystąpił błąd: ' + error.message);
          }

          return EMPTY;
        });
    }
  }
}
