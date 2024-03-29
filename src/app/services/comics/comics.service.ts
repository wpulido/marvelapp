import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comic } from 'src/app/interfaces/comic';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from 'src/app/interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {
  id: string;
  comicsFilter: Comic[];
  comics: Comic[];

  constructor(private http: HttpClient) {
  }

  getAllComics(): Observable<Comic[]> {
    return this.http
    .get<Comic[]>(`${environment.apiUrl}comics?limit=100&apikey=${environment.apiKey}`)
    .pipe(map((resp: any) => resp.data.results));
    
  }

  getComic(id: string): Observable<Comic[]> {
    return this.http
    .get<Comic[]>(`${environment.apiUrl}comics/${id}?apikey=${environment.apiKey}`)
    .pipe(map((data: any) => data.data.results));
  }

  getComicCharacters(id: string): Observable<Character[]> {
    return this.http
    .get<Character[]>(`${environment.apiUrl}comics/${id}/characters?apikey=${environment.apiKey}`)
    .pipe(map((data: any) => data.data.results));
  }

  filterComics(term: string) {
    this.comicsFilter = [];
    term = term.toLowerCase();
    this.comics.forEach(comic => {
      const lowerTitle = comic.title.toLowerCase();
      if (
        comic.title.indexOf(term) >= 0 ||
        lowerTitle.indexOf(term) >= 0
      ) {
        this.comicsFilter.push(comic);
      }
    });
  }
}
