import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { CalculateService } from 'src/app/services/calculate.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy{
  constructor(
    private cookieService: CookieService,
    private calculateService: CalculateService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title

  ) {}

  paymentResult:any
  status!: boolean
  score: number = 0
  scoreResult: any
  paymentData: any
  userId:any = uuidv4()
  userIdParams: any
  shareUrl:string = ""

  ngOnInit(): void {
    this.titleService.setTitle('Zekametre - Ödeme')
    this.route.params.subscribe((params) => {
      this.userIdParams = params['id']
    })

    if (!this.userIdParams){
      this.paymentResult = JSON.parse(this.cookieService.get('paymentResult'))
      this.score = Number(this.cookieService.get('userR'))
      this.scoreResult = this.calculateService.result_calculate(Number(this.score))
      this.paymentData = JSON.parse(this.cookieService.get('payment'))

      if (this.paymentResult.paymentStatus === 'true'){
        this.status = true

        

        // Database Save
        const saveData = {
          "name": this.paymentData.name,
          "surname": this.paymentData.surname,
          "gsmNumber": this.paymentData.gsmNumber,
          "email": this.paymentData.email,
          "indetitiyNumber": this.paymentData.identifyNumber,
          "payment": this.paymentResult.status,
          "certificate": false,
          "score": this.score,
          "result": this.scoreResult,
          "paymentId": this.paymentResult.paymentId
        }

        if (this.paymentData.productName === "certificate") {
          saveData.certificate = true;
        }
        
        this.apiService.saveUserResult(saveData, this.userId)
        this.shareUrl = environment.host + '/payment/' + this.userId
        // this.cookieService.delete('paymentResult');
        // this.cookieService.delete('payment')
        // this.cookieService.delete('userR')
      }else {
        this.status = false
      }
    }else {
      this.apiService.getUserWithValue(this.userIdParams).subscribe(userData => {
        if (userData.payment === 'success'){
          this.status = true
        }
        this.score = userData.score
        this.scoreResult = userData.result
      })
    }
  }

  buyCertificate(){
    this.router.navigate(['result'], {state: {"paymentStatus": "certificate", "price": "149"}})
  }

  getCertificate(){
    this.router.navigate(['certificate/'+this.userId])
  }

  ngOnDestroy(): void {
    this.cookieService.delete('paymentResult');
    this.cookieService.delete('payment')
    this.cookieService.delete('userR')
  }
}