import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SendbroadcastService {

  backendURL: string  = environment.backendURL;
  AppFolderapiURL: string  = environment.AppFolderapiURL;
  httpOptions = {
    headers: new HttpHeaders({
       //'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Type': 'application/json; charset=UTF-8',
       // 'Accept': 'application/json'
      // 'Content-Type': 'multipart/form-data'
    })
  };


  constructor(private httpClient: HttpClient) { }

  
  fetchAllAppVersion () {

    const url = `${this.backendURL + '/GetAllAppVersions.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong while fetching userTypes!');
        }
      )
    );
  }



  fetchAllUserTypes () {

    const url = `${this.backendURL + '/GetUserTypes.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong while fetching userTypes!');
        }
      )
    );
  }

  fetchAllStates () {

    const url = `${this.backendURL + '/statelist.php'}`;
    return this.httpClient.get(url).pipe(
    catchError(error => {
      return throwError('something went wrong!');
      }
    )
  );
  }
  
  GetBroadCastList () {

    const url = `${this.backendURL + '/broadcast/broadcastlist.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }
   

  deleteBroadcast(formData) {
    return this.httpClient
      .post(this.backendURL + '/deleteFromTable.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }

  SendBroadcast(formData) {
    return this.httpClient
      .post(this.backendURL + '/sendFCM.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }
 
 
  createBroadcast(formData) {
      return this.httpClient
        .post(this.backendURL + '/broadcast/createBroadcast.php', formData )
        .pipe(
          catchError(error => {
            return throwError('something went wrong!');
          }
        )
        );
  }



  GetCountriesList () {

    const url = `${this.backendURL + '/countryList.php'}`;
    return this.httpClient.get(url).pipe(
    catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }

  fetchNotificationTypes() {
    const url = `${this.backendURL + '/notificationTypeList.php'}`;
    return this.httpClient.get(url).pipe(
    catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );

  }



  // Users Module Services Start Here
  SearchUser(formData) {
    return this.httpClient
      .post(this.backendURL + '/userdetails/GetUsersList.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }

  SearchKPIUser(formData) {
    return this.httpClient
      .post(this.backendURL + '/userKpidetails/GetUsersKpiList.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }


  
  GetUserskPIList () {

    const url = `${this.backendURL + '/userKpidetails/GetUsersKpiList.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }


  GetUsersLedgerList() {

    const url = `${this.backendURL + '/userLedger/GetUserLedger.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }

  

  SearchLedgerUser(formData) {
    return this.httpClient
      .post(this.backendURL + '/userLedger/GetUserLedger.php',  formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }




  
  GetUsersList () {

    const url = `${this.backendURL + '/userdetails/GetUsersList.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }


  GetNearestRetailorDistributorList(formData) {
    return this.httpClient
      .post(this.backendURL + '/ShowUsersOnMap/GetUsersToOnMapList.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }
 
  GetNearestRetailorDistributorListByCategoryID(formData) {
    return this.httpClient
      .post(this.backendURL + '/ShowUsersOnMap/GetUsersOnMapListByCategoryId.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }

  UpdateISDCode(formData) {
    return this.httpClient
    .post(this.AppFolderapiURL + 'BukuMainApi.php', formData )
    .pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
    )
    );
  }

 
  UpdateExtractedAddress(formData) {
    return this.httpClient
    .post(this.AppFolderapiURL + 'BukuMainApi.php', formData )
    .pipe(
      catchError(error => {
        return throwError('something went wrong!');
      }
    )
    );
  }


  GetEMIUsersList () {

    const url = `${this.backendURL + '/userEmiDetails/userEmiDetails.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }


  SearchEMIUser(formData) {
    return this.httpClient
      .post(this.backendURL + '/userEmiDetails/userEmiDetails.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }


  GetStaffFeatureEnabledUsersList() {

    const url = `${this.backendURL + '/ServiceActivation/ServiceActivationApi.php'}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        return throwError('something went wrong!');
        }
      )
    );
  }

  
  SearchStaffUser(formData) {
    return this.httpClient
      .post(this.backendURL + '/ServiceActivation/ServiceActivationApi.php',  formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }

  sendFCMAndNotifyUser(formData) {
    return this.httpClient
      .post(this.backendURL + '/ServiceActivation/sendFCMAndNotifyUser.php', formData )
      .pipe(
        catchError(error => {
          return throwError('something went wrong!');
        }
      )
      );
  }

}
