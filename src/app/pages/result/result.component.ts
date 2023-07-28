import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeScript, Title } from '@angular/platform-browser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SessionService } from 'src/app/services/session.service';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{

  renderedCheckoutScript!: string;
  sanitizedCheckoutScript!: SafeScript;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private alertifyService: AlertifyService,
    private paymentService: PaymentService,
    private renderer: Renderer2,
    private cookieService: CookieService,
    private titleService: Title,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document
    
  ) {}

  
  paymentForm!: FormGroup
  sessionName: string = ""
  sessionSurname: string = ""
  paymentData: any
  responseData:any
  customPrice:any
  customDescription:any
  isCertificate:boolean = false

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      gsmNumber: [''],
      email: [''],
      identifyNumber: [''],
      city: ['',],
      price: [String(this.customPrice)],
      productName: [String(this.customDescription)],
      certificate:[false]

    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Zekametre - Ödeme Oluştur')

    
    this.customPrice = history.state.price
    this.customDescription = history.state.paymentStatus

    if (history.state.paymentStatus === 'certificate'){
      this.isCertificate = true
    }
  
    this.createPaymentForm()
    this.sessionName = this.sessionService.getSettionData("user").name
    this.sessionSurname = this.sessionService.getSettionData("user").surname
  }

  async sendPaymentData(){
    if (this.paymentForm.valid){
      this.paymentData = Object.assign({}, this.paymentForm.value)
      this.responseData = await this.paymentService.createPaymentForm(this.paymentData)
      this.alertifyService.success('İşlem başarılı')

      if (this.responseData.status === 'success') {
        const regex = /">(.*)</gm;
        
        const match = regex.exec(String(this.responseData.CheckoutFormData))
        if(match){
          
          const scriptElement = this.renderer.createElement('script');
          const scriptText = this.renderer.createText(match[1]);
          this.renderer.appendChild(scriptElement, scriptText);
          this.renderer.appendChild(this.document.head, scriptElement);
          // Save Data
          const id = this.sessionService.getSettionData('key')
          this.apiService.setAddUser(this.paymentData, id)
        }
        
      }

    }else{
      this.alertifyService.danger('Lütfen bilgilerinizi kontrol edin.')
    }
  }

}
