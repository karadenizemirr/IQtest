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

  userData: { name: string,surname:string, score: number }[] = [];
  inputValue!: string;
  

  ngOnInit(): void {

    this.getAllUser()
  }

  getAllUser(){
    this.apiService.getAllUser().subscribe((users) => {
      this.userData = Object.keys(users).map(key => users[key])
    })
  }


  handleButtonClick() {
    console.log(this.inputValue);
    if (this.inputValue){

      this.apiService.getUserWithValue(this.inputValue).subscribe((users) => {
        this.userData = Object.keys(users).map(key => users[key])
      })

    }else{
      this.getAllUser()
      this.alertifySerivce.danger('ID Bilgisi belirtiniz')
    }
  }

}
