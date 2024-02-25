import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Main, Character } from '../interfaces/main.interface';
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

  public getItemsByName(name: string): Observable<Main> {
    return this.http.get<Main>(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}?name=${name}`, {}
    )
    .pipe(shareReplay(1));
  }

  public getDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}/${id}`, {}
    )
    .pipe(shareReplay(1));
  }
}
