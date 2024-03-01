import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { ChatResponse } from '../_model/chat-response.interface';
import { SugarLevel } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class SugarService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/sugars/`;
  userToken: string = '';

  public getSugarLevels(): Promise<SugarLevel[]> {
    console.log('Im a server. Im trying to get sugar.');
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<SugarLevel[]>(`${this.url}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public deleteMeasurement(id: number) {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${id}`, { headers });
  }

  public updateMeasurement(sugarMeasurement: SugarLevel): Promise<SugarLevel> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put<SugarLevel>(`${this.url}`, sugarMeasurement, { headers })
        .pipe(map((response) => response))
    );
  }

  //   public getChatById(chatId: number): Promise<ChatResponse> {
  //     console.log('Im a server. Im trying to get chats.');
  //     const headers = this.authService.getBearerToken();
  //     return firstValueFrom(
  //       this.http
  //         .get<ChatResponse>(`${this.url}${chatId}`, {
  //           headers,
  //         })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public sendMessage(message: Message) {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to send message.');
  //     return firstValueFrom(
  //       this.http
  //         .put<Message>(`${this.url}add-message/${message.chatId}`, message, {
  //           headers,
  //         })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public createChat(chat: ChatRequest) {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to create chat.');
  //     return firstValueFrom(
  //       this.http
  //         .post<ChatRequest>(`${this.url}add`, chat, {
  //           headers,
  //         })
  //         .pipe(map((response) => response))
  //     );
  //   }
}
