import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certifica',
  templateUrl: './certifica.component.html',
  styleUrls: ['./certifica.component.scss']
})
export class CertificaComponent implements OnInit{
  
  @ViewChild('content') content!: ElementRef;

  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  userId:any
  userData:any

  ngOnInit(): void {
    this.activateRoute.params.subscribe((id) => {
      this.userId = id['id']
      
      this.apiService.getUserWithValue(this.userId).subscribe((user) => {
        this.userData = user
      })
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
