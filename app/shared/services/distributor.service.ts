import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Discurinventory } from '../../webview/discurrentinventory/discurinventory';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  // apiURL: string = 'http://pcexpertscare.com/lastmile/webapi/brands.php';
  // apiURL: string = 'http://pcexpertscare.com/lastmile/webapi/brand_add.php';
  //apiURL: string = 'http://pcexpertscare.com/lastmile/webapi';
  //apiURL: string = 'http://hibuku.com/webapi';
  apiURL: string = environment.apiURL;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Accept': 'application/json'
      // 'Content-Type': 'multipart/form-data'
    })
  };



  constructor(private httpClient: HttpClient) { }


  updateInventory(formData): Observable<any> {
    const url = `${this.apiURL + '/update_product.php'}`;
    console.log(url);
    return this.httpClient.post(url, formData, this.httpOptions).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }


  createInventory(formData): Observable<any> {
    const url = `${this.apiURL + '/insert_update_product.php'}`;
    return this.httpClient.post(url, formData).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }


  fetchAllProducts(data): Observable<Discurinventory> {
    const url = `${this.apiURL + '/get_product_list.php'}`;
    return this.httpClient.post<Discurinventory>(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }

  fetchAllProductsNew(data): Observable<Discurinventory> {
    const url = `${this.apiURL + '/get_product_list_new.php'}`;
    return this.httpClient.post<Discurinventory>(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }
  //cart add and update
  insertCart(data) {
    const url = `${this.apiURL + '/tbl_cart.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }

  placeorder(data) {
    const url = `${this.apiURL + '/invoice_generate.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }



  getProductById(formData): Observable<Discurinventory> {
    return this.httpClient.post<Discurinventory>(this.apiURL + '/get_product_list.php', formData).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }

  batchCountByRetailId(data) {

    const url = `${this.apiURL + '/getcartitem.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      }
      )
    );
  }

  getCartByRetailId(data) {

    const url = `${this.apiURL + '/getcartitem.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      }
      )
    );
  }

  getCartItemIsRemoved(data) {

    const url = `${this.apiURL + '/cartitemremove.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      }
      )
    );
  }

  getInvoiceByRetailId(data) {

    const url = `${this.apiURL + '/getinvoice.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      })
    );
  }

  cancelOrder(data) {

    const url = `${this.apiURL + '/cancelorder.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      })
    );
  }

  getOrderList(data) {
    const url = `${this.apiURL + '/getorderlist.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      })
    );
  }



  createFinalOrder(data) {

    const url = `${this.apiURL + '/finalorder.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      })
    );
  }


  getRetailerDtl(data) {

    const url = `${this.apiURL + '/getretailerDtl.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      }
      )
    );
  }

  insertUpdateRetailerPersonalDtl(data) {

    const url = `${this.apiURL + '/update_retailer_personalDtl.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      }
      )
    );
  }

  //statelist
  getStatesList() {
    const url = `${this.apiURL + '/statelist.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
      )
    );
  }

  public getPdf(data) {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
       
      })
    };
  
    const url = `${this.apiURL + '/getinvoicepdf.php'}`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        return throwError('something went wrong!');

      }
      )
    );

    //return this.http.get(`${this.BASE_URL}/help/pdf`, httpOptions);
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
