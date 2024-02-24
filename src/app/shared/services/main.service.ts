import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Main } from '../interfaces/main.interface';
import { config } from '../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) { }

  public getItems(page: number): Observable<Main> {
    return this.http.get<Main>(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}?page=${page}`, {}
    )
    .pipe(shareReplay(1));
  }
}
