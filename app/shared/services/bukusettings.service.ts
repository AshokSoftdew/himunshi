import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BukusettingsService {

  backendURL: string  = environment.backendURL;
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       // 'Accept': 'application/json'
      // 'Content-Type': 'multipart/form-data'
    })
  };


  constructor(private httpClient: HttpClient) { }


  bukuSettings () {

    const url = `${this.backendURL + '/bukusetting/UpdateBukuSetting.php'}`;
    return this.httpClient.get(url).pipe(
    catchError(error => {
      return throwError('something went wrong!');
      }
    )
  );
  }


  updateSetting(formData) {
    return this.httpClient
      .post(this.backendURL + '/bukusetting/UpdateBukuSetting.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }




}
