import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { QuestionComponent } from './pages/question/question.component';
import { ResultComponent } from './pages/result/result.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CorsInterceptor } from './http.interceptors';
import { PaymentComponent } from './pages/payment/payment.component';
import { CookieService } from 'ngx-cookie-service';
import { CertificaComponent } from './pages/certifica/certifica.component';
import { ResultTableComponent } from './pages/result-table/result-table.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerifyComponent,
    QuestionComponent,
    ResultComponent,
    PaymentComponent,
    CertificaComponent,
    ResultTableComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  providers: [
    AlertifyService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
