import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //apiURL: string = 'http://pcexpertscare.com/lastmile/webapi';
  apiURL: string  = environment.backendURL;
  
  // Http Options
  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded'
   
   })
 }

  constructor(private httpClient: HttpClient) { }

  isLoggedIn(logdtl){
    return this.httpClient
    .post<any>(this.apiURL+'/admin_login.php', logdtl , this.httpOptions)
    .pipe(
      catchError(error => {
        return throwError("something went wrong!");
      }
    )
    );
  }
}
