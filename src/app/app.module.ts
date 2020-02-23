import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersComponent} from './users/users.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {HeaderComponent} from './layouts/header/header.component';
import {UsersService} from './users/users.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingInterceptor} from './interceptors/loading-interceptor.service';
import {PaginationComponent} from './components/pagination/pagination.component';
import {LoadingService} from './interceptors/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    HeaderComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    HttpClientModule,
  ],
  providers: [
    UsersService,
    LoadingService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
