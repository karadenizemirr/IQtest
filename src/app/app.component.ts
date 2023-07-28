import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AlertifyService } from './services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  isSearchModal:boolean = false
  userId:string = ""


  openModal(){
    this.isSearchModal = true
  }

  closeModal(){
    this.isSearchModal = false
  }

  async searchCertificate(){
    const control = await this.apiService.getUserById(this.userId)

    if(control){
      this.alertifyService.success('Sertifika bulundu.')
      this.router.navigate(['certificate' + '/' + this.userId])
      this.closeModal()

    }else{
      this.alertifyService.danger('Sertifika bulunamadı.')
      this.closeModal()
    }
  }
}
