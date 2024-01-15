import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSubject$ = new BehaviorSubject<boolean>(false);

  setData(data: boolean): void {
    this.dataSubject$.next(data);
  }

  getData(): BehaviorSubject<boolean> {
    return this.dataSubject$;
  }
}
