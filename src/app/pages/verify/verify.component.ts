import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
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
    private alertifyService: AlertifyService
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

  getTestPage(){
    if (this.verifyForm.valid){
      this.verfiyData = Object.assign({}, this.verifyForm.value)
      this.sessionService.setSettionData("user", {"name": this.verfiyData.name, "surname": this.verfiyData.surname, "verify": true})
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
