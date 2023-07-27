import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { QuestionComponent } from './pages/question/question.component';
import { ResultComponent } from './pages/result/result.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CertificaComponent } from './pages/certifica/certifica.component';
import { ResultTableComponent } from './pages/result-table/result-table.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "verify", component: VerifyComponent},
  {path: "questions", component: QuestionComponent},
  {path: "result", component: ResultComponent},
  {path: "payment", component: PaymentComponent},
  {path: "payment/:id", component: PaymentComponent},
  {path: "certifica", component: CertificaComponent},
  {path: "result-table", component: ResultTableComponent},
  {path: "certificate/:id", component: CertificaComponent},
  {path: "**", component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
