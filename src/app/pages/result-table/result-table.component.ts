import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})

export class ResultTableComponent implements OnInit{
  constructor(
    private apiService: ApiService,
    private alertifySerivce: AlertifyService
  ) {}

  userData: any[] = []
  inputValue!: string;
  

  ngOnInit(): void {
    this.getAllUser()
    console.log(this.userData)
  }

  async getAllUser(){

    const response = await this.apiService.getAllUser()
    response?.forEach((user:any) => {
      this.userData.push(user.data())
    })
  }


  async handleButtonClick() {
    if (this.inputValue){
      this.userData = [await this.apiService.getUserById(this.inputValue)]
    }else{
      this.getAllUser()
      this.alertifySerivce.danger('ID Bilgisi belirtiniz')
    }
  }

}
