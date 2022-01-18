import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getGameList( ordering: string, search?: string ): Observable<APIResponse<Game>> {
    //set params for ordering and search(if exists)
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    // return the response for APIResponse<Game> after hitting the URL
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, { params: params });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoReq = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersReq = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsReq = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({gameInfoReq, gameTrailersReq, gameScreenshotsReq}).pipe(
      map((res: any) => {
        return {
          ...res['gameInfoReq'],
          trailers: res['gameTrailersReq']?.results,
          screenshots: res['gameScreenshotsReq']?.results,
        }
      })
    )
  }
}
