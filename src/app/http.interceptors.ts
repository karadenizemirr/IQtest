import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'content-type': 'application/json'
      },
    });

    // HttpHeaders'i AxiosHeaders'a dönüştür
    const axiosHeaders: any = {};
    modifiedReq.headers.keys().forEach(key => {
      axiosHeaders[key] = modifiedReq.headers.get(key);
    });

    // Axios isteği yapıldığında
    axios(modifiedReq.url, {
      method: modifiedReq.method,
      headers: axiosHeaders,
      data: modifiedReq.body
    })
      .then(response => {
        // İstek başarılı olduğunda yapılacak işlemler
        console.log(response.data);
        // İsteği tamamlayın
        next.handle(modifiedReq);
      })
      .catch(error => {
        // İstek hatalı olduğunda yapılacak işlemler
        console.error(error);
      });

    // İnterceptor'ın devam etmesini sağlayın
    return next.handle(modifiedReq);
  }
}
