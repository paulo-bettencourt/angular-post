import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  
  getVideos() {
    return this.http.get<any>('http://localhost:8080/videos');
  }
}
