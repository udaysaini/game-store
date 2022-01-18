import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string;
  game: Game;

  routeSubscription: Subscription;
  gameSubscription: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id: string): void {
    this.gameSubscription = this.httpService.getGameDetails(id).subscribe((data: Game) => {
      this.game = data;
      console.log(data);

      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    })
  }

  getColor(value: number): string {
    if (value > 75 ) return '#5ee432';
    else if (value > 50) return '#fffa50';
    else if (value > 30) return '#f7aa38';
    else return '#ef4655';
  }

  ngOnDestroy(): void {
    // close the subscriptions to prevent memory leaks.
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
  }

}
