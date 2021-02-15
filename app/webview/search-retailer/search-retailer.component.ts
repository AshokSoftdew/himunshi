import { Component, OnInit,  ElementRef, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';

import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { MouseEvent } from '@agm/core';
import { SendbroadcastService } from '../../shared/services/sendbroadcast.service';


@Component({
  selector: 'app-search-retailer',
  templateUrl: './search-retailer.component.html',
  
  styleUrls: ['./search-retailer.component.scss']
})
export class SearchRetailerComponent implements OnInit {

  constructor(private SearchRetailerService: SendbroadcastService,  // users all filer function are available in broadcast service
    public toasterService: ToastrService,
    private router: Router,
    public actroute: ActivatedRoute) { }

    
  title = 'Search & Add Seller to My Contact';

  userid: any;
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
  bussinessCategoryList: any;
  GotLatlonList: any;
  ButtonShowHide: boolean;


  markers: Marker[] = [];
 
  zoom: number = 12;

  radius: number = 50;
  
  // initial center position for the map
  lat: number = 28.7041;
  lng: number = 77.1025;
 

  selectedCate :any = [];

  isLoadingResults = false;

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.bussinessCategoryList =   [{'Id':'0','Label':'Select Your Business'},
                                    {'Id':'1','Label':'General Store Groceries'},
                                    {'Id':'2','Label':'Apparels Garments'},
                                    {'Id':'3','Label':'Building And Construction'},
                                    {'Id':'4','Label':'Cafe Resturant'},
                                    {'Id':'5','Label':'Car Bike Dealer'},
                                    {'Id':'6','Label':'Cosmetics And Personal Care'},
                                    {'Id':'7','Label':'Electricals'},
                                    {'Id':'8','Label':'Electricals And Computers'},
                                    {'Id':'9','Label':'Fruits Vegetables'},
                                    {'Id':'10','Label':'Hardware'},
                                    {'Id':'11','Label':'Handloom Matterss Pillow Ets'},
                                    {'Id':'12','Label':'Juice Corner'},
                                    {'Id':'13','Label':'Kitchen Utensils And Applications'},
                                    {'Id':'14','Label':'Medical Store'},
                                    {'Id':'15','Label':'Mobile Phone Accessories'},
                                    {'Id':'16','Label':'Opticals'},
                                    {'Id':'17','Label':'Paan Bidi Cigeratte'},
                                    {'Id':'18','Label':'Stationary'},
                                    {'Id':'19','Label':'Sweets Bakery Namkeen'},
                                    {'Id':'20','Label':'Toy And Games'}];

      this.userid = this.actroute.snapshot.params['userId'];
     // alert(this.userid);
    // this.fetchAllStates();
    // this.fetchAllUserTypes();

  }


  AddThisSellerToMyContact(sellerId, UserId) {

    alert(sellerId);
    alert(UserId);

  }


  filternbyBusinessCate() {
    const radius = ((document.getElementById('radius') as HTMLInputElement).value);
    if(radius==='') {
      this.toasterService.error('', 'Please Enter Radius Range!');
      return false;
    }
    this.isLoadingResults = true;

    this.params = JSON.stringify({ 'BusCateId':this.selectedCate, 'Radius':radius });
    const formData = new FormData();
    formData.append('cmd', this.params);
 
    this.SearchRetailerService.GetNearestRetailorDistributorListByCategoryID(formData).subscribe(
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
  GetCountriesList() {
    
    return this.SearchRetailerService.GetCountriesList()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;
        if(this.response.status===0) {
         // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('', 'Country Data Not Found!');
        } else if(this.response.status===1) {
            this.bussinessCategoryList = this.response.countryList;
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
*/
  
  fetchAllStates() {
    
    return this.SearchRetailerService.fetchAllStates()
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
 
    return this.SearchRetailerService.fetchAllUserTypes()
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
  /*
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }*/
  
  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


}

// just an interface for type safety.
interface Marker {
   
 
  user_id: number; 
  lat: number; 
  lng: number;
  label?: string;
  business_name?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  addressCheck?: string;
  draggable: boolean;
  ButtonShowHide: boolean;

} 