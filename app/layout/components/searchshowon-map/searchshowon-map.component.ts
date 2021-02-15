import { Component, OnInit,  ElementRef, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';
 
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { MouseEvent } from '@agm/core';

import { SendbroadcastService } from '../../../shared/services/sendbroadcast.service';


@Component({
  selector: 'app-searchshowon-map',
  templateUrl: './searchshowon-map.component.html',
  styleUrls: ['./searchshowon-map.component.scss']
})

 

export class SearchshowonMapComponent implements OnInit {





  constructor(private SearchshowService: SendbroadcastService,  // users all filer function are available in broadcast service
    public toasterService: ToastrService,
    private router: Router,) { }

  title = 'Search & Show Users Details on MAP';

  response: any;
  states: any;
  masterSelected:boolean;
  masterUserTypeSelected:boolean;
  checklist:any;
  selectedStates:any; 
  selectedUserType:any; 
  selectedActiveInactiveList:any;
  usertypes:any;
  params: any;
  userdetailsList: any; 
  ActiveInactiveList: any;
  countryList: any;
  GotLatlonList: any;

  markers: Marker[] = [];
 
  zoom: number = 3.5;

  radius: number = 10000;
  
  // initial center position for the map
  lat: number = 28.7041;
  lng: number = 77.1025;
 

  selectedCountries :any = [];

  isLoadingResults = false;
  // displayedColumnsBroadcasts: string[] = ['Sn', 'person_name','mobile','email',  'state', 'joined_on', 'action'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  ngOnInit() {
     
    this.GetCountriesList();
    this.fetchAllStates();
    this.fetchAllUserTypes();

   // this.GetUsersList(); // Broadcast List

  }

  

  

  filterDetails() {
    const radius = ((document.getElementById('radius') as HTMLInputElement).value);
    if(radius==='') {
      this.toasterService.error('', 'Please Enter Radius Range!');
      return false;
    }
    this.isLoadingResults = true;

    this.params = JSON.stringify({'stateArray': this.selectedStates, 'userTypeArray':this.selectedUserType,  'Countries':this.selectedCountries, 'ActiveInactiveList':this.ActiveInactiveList, 'Radius':radius });
    const formData = new FormData();
    formData.append('cmd', this.params);
 
    this.SearchshowService.GetNearestRetailorDistributorList(formData).subscribe(
      (data) => { 
        
        const datacount = JSON.parse(JSON.stringify(data));
      //  alert(data);
        if(datacount.length > 0 ) {
          
            this.isLoadingResults = false;
            this.markers  = datacount ; //[{lat: 51.673858,lng: 7.815982, label: 'A',draggable: true},{lat: 51.373858,lng: 7.215982,label: 'B',draggable: false},{lat: 51.723858,lng: 7.895982,label: 'C',draggable: true}];
            this.isLoadingResults = false;
            // this.userdetailsList = datacount;
            // this.dataSource.data = datacount;
            // this.dataSource.paginator = this.paginator;
          
        } else {

          this.toasterService.error('Manage Users!', 'No Record Found!');
        }


          // this.response = data;
          // if(this.response.status===0) {
          // // this.toasterService.success(this.response.msg, 'Manage products!');
          //     this.toasterService.error('BroadCast Error! ', 'Please Try Again!');
          // } else if(this.response.status===1) {
              
          //     // this.toasterService.success('Boradcast Saved!', 'Boradcast Added Successfully!');
          //     // setTimeout(() => {
          //     //   window.location.reload();
          //     //   }, 1000);
          // } else  if(this.response.status===2) {
          //    this.toasterService.error('No Record Found!', 'Manage products!');
          // }
          //console.log(res);
      },
      error => {
        
        //this.loading = false;
    });

  }


   /*
  GetUsersList() {
    
    return this.SearchshowService.GetUsersList()
    .subscribe(
    (data) => { 
        // this.transactions = data;'
        const datacount = JSON.parse(JSON.stringify(data));
        
        if(datacount.length > 0 ) {
          this.isLoadingResults = false;
          this.userdetailsList = datacount;
          this.dataSource.data = datacount;
          console.log(this.userdetailsList);
          this.dataSource.paginator = this.paginator;
          
        } else {

          this.toasterService.error('Manage Users!', 'No Record Found!');
        }
    },
    error => {

    });
 }*/

  
  GetCountriesList() {
    
    return this.SearchshowService.GetCountriesList()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;
        if(this.response.status===0) {
         // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('', 'Country Data Not Found!');
        } else if(this.response.status===1) {
            this.countryList = this.response.countryList;
           // this.dataSource.data = this.response.records as Discurinventory[];
           // this.dataSource.paginator = this.paginator;
           // console.log('ddsfdsfds ' + this.transactions);
        } else  if(this.response.status===2) {
           this.toasterService.error('', 'Country Data Not Found!');
        }
    },
    error => {

    });
  }

  
  fetchAllStates() {
    
    return this.SearchshowService.fetchAllStates()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;
        if(this.response.status===0) {
         // this.toasterService.success(this.response.msg, 'Manage products!');
           // this.toasterService.error(this.response.msg, 'Manage products!');
        } else if(this.response.status===1) {
            this.states = this.response.statesList;
           // this.dataSource.data = this.response.records as Discurinventory[];
           // this.dataSource.paginator = this.paginator;
           // console.log('ddsfdsfds ' + this.transactions);
        } else  if(this.response.status===2) {
           this.toasterService.error('No Record Found!', 'Manage products!');
        }
    },
    error => {

    });
  }

  
  fetchAllUserTypes() {
 
    return this.SearchshowService.fetchAllUserTypes()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;
        if(this.response.status===0) {
        // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.msg, 'Manage products!');
        } else if(this.response.status===1) {
            this.usertypes = this.response.UserTypesList;
          // this.dataSource.data = this.response.records as Discurinventory[];
          // this.dataSource.paginator = this.paginator;
          // console.log('ddsfdsfds ' + this.transactions);
        } else  if(this.response.status===2) {
          this.toasterService.error('No Record Found!', 'Manage products!');
        }
    }, 
    error => {

    });
}





  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



 

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

// just an interface for type safety.
interface Marker {
    lat: number; 
    lng: number;
    label?: string;
    person_name?: string;
    mobile?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    addressCheck?: string;
    draggable: boolean;
} 