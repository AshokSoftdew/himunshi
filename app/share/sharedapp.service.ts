import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedappService {

  backendURL: string  = environment.backendURL;
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       // 'Accept': 'application/json'
      // 'Content-Type': 'multipart/form-data'
    })
  };


  constructor(private httpClient: HttpClient) { }


  sharedApp(formData) {
    return this.httpClient
      .post(this.backendURL + '/shareapp/ShareApp.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }

}
