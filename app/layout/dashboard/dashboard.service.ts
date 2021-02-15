import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  backendURL: string  = environment.backendURL;
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       // 'Accept': 'application/json'
      // 'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private httpClient: HttpClient) { }

  fetchChartsData(formData) {
    return this.httpClient
      .post(this.backendURL + '/Dashboard/charts.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
}


}
