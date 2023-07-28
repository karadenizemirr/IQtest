import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ApiService } from 'src/app/services/api.service';
import { CalculateService } from 'src/app/services/calculate.service';
import { SessionService } from 'src/app/services/session.service';
import questions from 'src/app/types/questions.types';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{

  constructor(
    private calculateService: CalculateService, 
    private router: Router,
    private alertifyService: AlertifyService,
    private titleService: Title,
    private apiService: ApiService,
    private sessionService: SessionService
    ){}

  questionIndex = 0
  questions = questions
  allAnswers: any[] = [];
  onSelect:boolean = false
  selectedAnswer!: string;
  minutes: number = 0
  seconds: number = 0
  interval: any;

  ngOnInit(): void {
    this.titleService.setTitle('Zekametre - Sorular')
    this.startCountdown();
  }

  startCountdown() {
    const startingMinutes = 5;
    let time = startingMinutes * 60;

    this.interval = setInterval(() => {
      this.minutes = Math.floor(time / 60);
      this.seconds = time % 60;

      if (time > 0) {
        time--;
      } else {
        this.stopCountdown();
        this.alertifyService.danger('Süreniz doldu')
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.interval);
  }

  nextQuestion(){
    try{

      if(this.questionIndex < this.questions.length - 1){
        this.questionIndex++
        this.selectedAnswer = ""
      }else{
        const score = this.calculateService.score_calculate(this.allAnswers)
        const id = this.sessionService.getSettionData('key')
        this.apiService.setAddUser({"score": score}, id)
        this.router.navigate(['result'], {state: {"paymentStatus": "result", "price": "39"}})
      }

    }catch(err){
      console.log('Error')
    }
  }

  selectQuestion(answer: any, questionIndex: number) {
    this.onSelect = true
    this.selectedAnswer = answer.key
    // Check if the selected answer already exists in the allAnswers array
    const existingAnswer = this.allAnswers.find(chosen => chosen.questionIndex === questionIndex && chosen.answer === answer);
    if (existingAnswer) {
      return;
    }
  
    // Add the selected answer to the allAnswers array
    this.allAnswers.push({ questionIndex, answer });
  }

  previousQuestion() {
    try {
      if (this.questionIndex > 0) {
        this.questionIndex--;
        this.selectedAnswer = ""
      } else {
        this.alertifyService.danger('İlk sorudan geriye gidemezsiniz.')
      }
    } catch (err) {
      console.log("Hata oluştu");
    }
  }
}