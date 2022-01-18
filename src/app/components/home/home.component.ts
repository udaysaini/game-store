import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games: Array<Game> = [];

  private routeSubscription: Subscription;
  private gameSubscription: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getGames();
  }

  // get games using SearchGames function
  getGames() {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      console.log({params});

     if (params['game-search']) {
       this.searchGames('metacritic', params['game-search']);
     } else {
       this.searchGames('metacritic');
     }
   })
  }

  // filter from the list of games
  searchGames(sort: string, search?: string): void {
    this.gameSubscription = this.httpService.getGameList(sort, search).subscribe( (gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);
    })
  }

  openGameDetails(id: number): void {
    // navigate to another route to get game details.
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    // close the subscriptions to prevent memory leaks.
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
  }

}
