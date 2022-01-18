import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GaugeModule } from 'angular-gauge';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    GameDetailsComponent,
    GameTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    GaugeModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }