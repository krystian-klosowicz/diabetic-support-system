import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { ChatResponse, Message } from '../_model/chat-response.interface';
import { ChatRequest } from '../_model/chat-request';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/chats/`;
  userToken: string = '';

  public getChatsForUser(userName: string): Promise<ChatResponse[]> {
    console.log('Im a server. Im trying to get chats.');
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<ChatResponse[]>(
          `${this.url}first-or-second-username/${userName}`,
          {
            headers,
          }
        )
        .pipe(map((response) => response))
    );
  }

  public getChatById(chatId: number): Promise<ChatResponse> {
    console.log('Im a server. Im trying to get chats.');
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<ChatResponse>(`${this.url}${chatId}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public sendMessage(message: Message) {
    const headers = this.authService.getBearerToken();
    console.log('Im a server. Im trying to send message.');
    return firstValueFrom(
      this.http
        .put<Message>(`${this.url}add-message/${message.chatId}`, message, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public createChat(chat: ChatRequest) {
    const headers = this.authService.getBearerToken();
    console.log('Im a server. Im trying to create chat.');
    return firstValueFrom(
      this.http
        .post<ChatRequest>(`${this.url}add`, chat, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }
}
