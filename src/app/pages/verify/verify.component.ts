import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private alertifyService: AlertifyService,
    private apiService: ApiService
  ) { }

  verifyForm!: FormGroup
  verfiyData: any
  createVerifyForm(){
    this.verifyForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      verify: ['', Validators.required]
    })
  }

  async getTestPage(){
    if (this.verifyForm.valid){
      this.verfiyData = Object.assign({}, this.verifyForm.value)
      const savedata = await this.apiService.addUser({"name": this.verfiyData.name, "surname": this.verfiyData.surname, "verify": true})
      this.sessionService.setSettionData('key', savedata?.id)
      this.alertifyService.success('Kayıt başarılı')
      this.router.navigate(['questions'])
    }
  }

  ngOnInit(): void {
    try{
      this.createVerifyForm()
    }catch(err){
      console.log('Error')
    }
  }


}
