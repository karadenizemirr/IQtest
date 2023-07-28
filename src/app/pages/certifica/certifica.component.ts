import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-certifica',
  templateUrl: './certifica.component.html',
  styleUrls: ['./certifica.component.scss']
})
export class CertificaComponent implements OnInit{
  
  @ViewChild('content') content!: ElementRef;

  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private titleService: Title
  ) {}

  userId:any
  userData:any

  ngOnInit(): void {
    this.titleService.setTitle('Sertifikam')
    this.activateRoute.params.subscribe(async (id) => {
      this.userId = id['id']
      this.userData = await this.apiService.getUserById(this.userId)

      console.log(this.userData)
    })
  }

  convertToPdf() {
    html2canvas(this.content.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('converted.pdf');
    });
  }

}
