import { Component, OnInit, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';

import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { SendbroadcastService } from '../../../shared/services/sendbroadcast.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, 
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;

  
  profileForm = new FormGroup({
    selected: new FormControl([])
  });

  
  title = 'User Details';

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
  TotalUsers: any;
  VersionTypesList: any;

  selectedNewOption:any; 

  selectedCountries :any = [];
  selectedAppVersions :any = [];

  isLoadingResults = true;
  displayedColumnsBroadcasts: string[] = ['Sn', 'id', 'isd_code', 'person_name','mobile','email',  'm_user_type_id', 'app_version', 'is_verified', 'language', 'timezone', 'extracted_address', 'joined_on', 'last_active_on', 'reffered_by', 'TotalReferred'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private userdetailsService: SendbroadcastService,  // users all filer function are available in broadcast service
    public toasterService: ToastrService,
    private router: Router,) { }

    onToggleDropdown() {
      this.multiSelect.toggleDropdown();
    }

  ngOnInit() {
    
    //this.GetCountriesList();
    //this.fetchAllStates();
    this.fetchAllUserTypes();
    this.fetchAllAppVersion();


    this.GetUsersList(); // Broadcast List


  }

  UpdateExtractedAddress() {
    // https://hibuku.com/webapi/BukuMainApi.php?cmd=
    // {"apitype":"GetipAddress","appversion":"1.1","data":{"userid":"","ipaddress":"","type":1}}  
         // const newData = JSON.stringify({'userid': '', 'ipaddress':'',  'type':1});
          const newData = {'userid': '', 'ipaddress':'',  'type':2};
          this.params = JSON.stringify({'apitype': 'GetipAddress', 'appversion':'1.1',  'data':newData});
          const formData = new FormData();
          formData.append('cmd', this.params);
         
          this.userdetailsService.UpdateExtractedAddress(formData).subscribe(
            (data) => { 
              this.response =JSON.parse(JSON.stringify(data));
              // alert(this.response.status);
              if(this.response.status===0) {
                  this.toasterService.error('', 'Country Data Not Found!');
              } else if(this.response.status===1) {
                this.toasterService.success('User Details!', this.response.msg);
                this.GetUsersList();
              }
            },
            error => {
               
              //this.loading = false;
          });
      
        }


  UpdateISDCode() {
// https://hibuku.com/webapi/BukuMainApi.php?cmd=
// {"apitype":"GetipAddress","appversion":"1.1","data":{"userid":"","ipaddress":"","type":1}}  
     // const newData = JSON.stringify({'userid': '', 'ipaddress':'',  'type':1});
      const newData = {'userid': '', 'ipaddress':'',  'type':1};
      this.params = JSON.stringify({'apitype': 'GetipAddress', 'appversion':'1.1',  'data':newData});
      const formData = new FormData();
      formData.append('cmd', this.params);
   
      this.userdetailsService.UpdateISDCode(formData).subscribe(
        (data) => { 
          this.response =JSON.parse(JSON.stringify(data));
          // alert(this.response.status);
          if(this.response.status===0) {
              this.toasterService.error('', 'Country Data Not Found!');
          } else if(this.response.status===1) {
            this.toasterService.success('User Details!', this.response.msg);
            this.GetUsersList();
          }
        },
        error => {
          
          //this.loading = false;
      });
  
    }
   





  GetUsersList() {
    
    return this.userdetailsService.GetUsersList()
    .subscribe(
    (data) => { 
        // this.transactions = data;'
        const datacount = JSON.parse(JSON.stringify(data));
        
        if(datacount.length > 0 ) {
          this.isLoadingResults = false;
          //this.userdetailsList = datacount;
          this.dataSource = new MatTableDataSource(datacount);
          this.dataSource.sort = this.sort;
          this.TotalUsers = datacount.length;
          this.dataSource.paginator = this.paginator;
          
        } else {

          this.toasterService.error('Manage Users!', 'No Record Found!');
        }
    },
    error => {

    });
}

  
  GetCountriesList() {
    
    return this.userdetailsService.GetCountriesList()
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
    
    return this.userdetailsService.fetchAllStates()
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

  
  fetchAllAppVersion() {

        return this.userdetailsService.fetchAllAppVersion()
        .subscribe(
        (data) => { 
            // this.transactions = data;
            this.response = data;
            if(this.response.status===0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
                this.toasterService.error(this.response.msg, 'Manage User Details!');
            } else if(this.response.status===1) {
                this.VersionTypesList = this.response.VersionTypesList;
              // this.dataSource.data = this.response.records as Discurinventory[];
              // this.dataSource.paginator = this.paginator;
              // console.log('ddsfdsfds ' + this.transactions);
            } else  if(this.response.status===2) {
              this.toasterService.error('No Record Found!', 'Manage User Details!');
            }
        }, 
        error => {

        });

  }



  fetchAllUserTypes() {
 
    return this.userdetailsService.fetchAllUserTypes()
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
          // console.log('ddsfdsfds ' + this.transactions);nn
        } else  if(this.response.status===2) {
          this.toasterService.error('No Record Found!', 'Manage products!');
        }
    }, 
    error => {

    });
}




  filterDetails() {
        
    
    const joiningdatefrom = ((document.getElementById('joiningdatefrom') as HTMLInputElement).value);
    const joiningdateto = ((document.getElementById('joiningdateto') as HTMLInputElement).value);

    this.params = JSON.stringify({'stateArray': this.selectedStates, 'userTypeArray':this.selectedUserType,  'Countries':this.selectedCountries, 'AppVersions':this.selectedAppVersions, 'ActiveInactiveList':this.ActiveInactiveList,'joiningdatefrom':joiningdatefrom,'joiningdateto':joiningdateto});
    const formData = new FormData();
    formData.append('cmd', this.params);
 
    this.userdetailsService.SearchUser(formData).subscribe(
      (data) => { 
        
        const datacount = JSON.parse(JSON.stringify(data));
        
        if(datacount.length > 0 ) {
          
            this.isLoadingResults = false;
            //this.userdetailsList = datacount;
            this.TotalUsers = datacount.length;
           // alert(this.TotalUsers);
            this.dataSource.data = datacount;
            this.dataSource.paginator = this.paginator;
          
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
