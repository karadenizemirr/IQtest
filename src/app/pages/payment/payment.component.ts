import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { CalculateService } from 'src/app/services/calculate.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  constructor(
    private cookieService: CookieService,
    private calculateService: CalculateService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private sessionService: SessionService

  ) {}

  paymentResult:any
  status!: boolean
  scoreResult: any
  userId:any
  shareUrl:string = ""
  endUserData:any
  certificate: boolean = false

  async ngOnInit() {
    this.titleService.setTitle('Zekametre - Ödeme')
    
    this.route.params.subscribe((params) => {
      this.userId = params['id'] || this.sessionService.getSettionData('key')
    })
    this.shareUrl = environment.angularServer + "/payment/" + this.userId
    
    if (!this.sessionService.getSettionData('key') && !this.userId) this.router.navigate(['/']);

    this.paymentResult = JSON.parse(this.cookieService.get('paymentResult'))
    this.status = this.paymentResult.status === 'success';
    // Get User Data
    const userData:any =await this.getUserData(this.userId)

    this.scoreResult = this.calculateService.result_calculate(userData?.score)
    this.certificate = userData.productName === 'certificate'
    const saveUserData = {
      paymentResult: this.paymentResult,
      scoreResult: this.scoreResult
    }
    
    this.endUserData = await this.apiService.setAddUser(saveUserData, this.userId)
    this.sessionService.removeSession('key')

    
  }

  buyCertificate(){
    this.router.navigate(['result'], {state: {"paymentStatus": "certificate", "price": "149"}})
  }

  getCertificate(){
    this.router.navigate(['certificate/'+this.userId])
  }

  async getUserData(id:string){
    return await this.apiService.getUserById(id)
  }

}