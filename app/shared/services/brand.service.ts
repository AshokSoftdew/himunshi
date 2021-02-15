import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Brand } from './brand';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class BrandService {

    apiURL: string  = environment.backendURL;
  // apiURL: string = 'http://pcexpertscare.com/lastmile/webapi/brands.php';
  // apiURL: string = 'http://pcexpertscare.com/lastmile/webapi/brand_add.php';
  //apiURL: string = 'http://pcexpertscare.com/lastmile/webapi';
  //apiURL: string = 'http://himunshi.com/webapi';

   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'

    })
  };

  constructor(private httpClient: HttpClient) { }


// Add a new Brand
createBrand(brand: Brand): Observable<Brand> {
  return this.httpClient
    .post<Brand>(this.apiURL + '/brand_add.php', brand , this.httpOptions)
    .pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
    )
    );
}


// getBrandDtl
getBrandsById(id: number): Observable<Brand> {
  return this.httpClient.get<Brand>(this.apiURL + '/brand_get_id.php?brand_id=' + id).pipe(
    catchError(error => {
      return throwError('something went wrong!');
    }
  )
  );
}


updateBrand (id, formData): Observable<any> {
  const url = `${this.apiURL + '/brand_update.php'}`;
  return this.httpClient.post(url, formData, this.httpOptions).pipe(
    catchError(error => {
      return throwError('something went wrong!');
    }
  )
  );
}

 /// testing
firstClick(): Observable<any> {
  return this.httpClient.get(this.apiURL);
}

fetchBrands(): Observable<Brand[]> {
  return this.httpClient.get<Brand[]>(this.apiURL + '/brands.php').pipe(
    catchError(error => {
      return throwError('something went wrong!');
    }
  )
  );
}

deleteBrand (id): Observable<Brand> {

  const url = `${this.apiURL + '/brand_delete.php?brand_id=' + id}`;

  return this.httpClient.get<Brand>(url).pipe(
    catchError(error => {
      return throwError('something went wrong!');
    }
  )
  );
}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
