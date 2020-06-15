import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgOptionHighlightModule} from "@ng-select/ng-option-highlight";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DataService} from "../service/data.service";
import {JwtInterceptorService} from "../service/interceptor/jwt-interceptor.service";
import {ErrorInterceptorService} from "../service/interceptor/error-interceptor.service";
import {UserService} from "../service/user.service";

const apiInterceptorFactory = () => {
  return new JwtInterceptorService();
};

const httpModules = [ HttpClientModule ];


@NgModule({
  declarations: [ HeaderComponent, FooterComponent ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ...httpModules,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbToastModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useFactory: apiInterceptorFactory, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    DataService, UserService
  ]
})
export class SharedModule {
  constructor() {
  }
}
