import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError } from 'rxjs/operators'
import { Observable, throwError, Subject } from 'rxjs';
import { Main, Character } from '../interfaces/main.interface';
import { config } from '../../app.constant';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  private errorSubject = new Subject<string>();
  
  constructor(private http: HttpClient) { }

  /**
   * requests api to fetch items
   * @param page number 
   * @return Observable<Main> of type Main to be subscribe by 
   */
  public getItems(page: number): Observable<Main> {
    return this.http.get<Main>(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}?page=${page}`, {}
    )
    .pipe(shareReplay(1),
      catchError((error) => {
        this.errorSubject.next('Oops, an error has occurred.');
        return throwError(error);
      })
    );
  }

  /**
   * requests api to fetch items by name
   * @param name 
   * @return Observable<Main> of type Main to be subscribe by 
   */
  public getItemsByName(name: string): Observable<Main> {
    return this.http.get<Main>(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}?name=${name}`, {}
    )
    .pipe(
      shareReplay(1),
      catchError((error) => {
        this.errorSubject.next('Oops, an error has occurred.');
        return throwError(error);
      })
    );
  }

  /**
   * requests api to get the details of the Character
   * @param id Character number
   * @return Observable<Characcter> of type Character to be subscribed by
   */
  public getDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}/${id}`, {}
    )
    .pipe(shareReplay(1),
    catchError((error) => {
      this.errorSubject.next('Oops, an error has occurred.');
      return throwError(error);
    }));
  }

  /**
   * get Error Subject 
   * @return the error subject obserable to be subscribed by
   */
  getErrorSubject(): Observable<string> {
    return this.errorSubject.asObservable();
  }
}
