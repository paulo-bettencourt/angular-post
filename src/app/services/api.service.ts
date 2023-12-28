import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  getVideos() {
    return this.http.get<any>(environment.API_POSTS);
  }

  login(authData: any) {
    return this.http.post<any>(environment.API_AUTH_REGISTER, authData);
  }

  register(authData: any) {
    return this.http.post<any>(environment.API_AUTH_LOGIN, authData);
  }
}
