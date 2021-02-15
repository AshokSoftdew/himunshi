import { Component, OnInit, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';

import { MatPaginator, MatSort, MatSortable, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { SendbroadcastService } from '../../../shared/services/sendbroadcast.service';
import { environment } from '../../../../environments/environment';

interface Values {
   id: number;
   message: string;
}

@Component({
  selector: 'app-sendbroadcast',
  templateUrl: './sendbroadcast.component.html',
  styleUrls: ['./sendbroadcast.component.scss']
})
export class SendbroadcastComponent implements OnInit {

  
    title = 'Manage Inventory';
    
    response: any;
    states: any;
    masterSelected:boolean;
    masterUserTypeSelected:boolean;
    checklist:any;
    selectedStates:any;
    selectedUserType:any; 
    
    usertypes:any;
    params: any;
    broadcastList: any; 
    selectedActiveInactiveList:any;
    ActiveInactiveList: any;
    countryList: any;

    VersionTypesList: any;
    

    selectedShowtoUserList:any;
    ShowtoUserList: any;

    selectedNotificationTypeList:any;
    NotificationTypeList: any;

    selectedCountries :any = [];
    selectedAppVersions :any = [];
    NoImage: string = environment.defaultImageURL+'assets/images/no-image.png';
    

    isLoadingResults = true;
    displayedColumnsBroadcasts: string[] = ['Sn', 'img', 'title','message', 'ShowNitificationToUser', 'notification_type', 'datetime',  'send', 'action', 'response'];

  
 
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private sendbroadcastService: SendbroadcastService,
              public toasterService: ToastrService,
              private router: Router, ) { 
  
              // const broadcastForm = new FormControl();

          this.masterSelected = false;
          this.masterUserTypeSelected = false;
          
    }


  ngOnInit() {
    
    
    //this.GetCountriesList();
    //this.fetchAllStates();
    this.fetchAllUserTypes();
    this.fetchNotificationTypes();
    this.fetchAllAppVersion();

    

    this.GetBroadCastList(); // Broadcast List

   


  }



  fetchAllAppVersion() {

    return this.sendbroadcastService.fetchAllAppVersion()
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




  fetchNotificationTypes() {
    return this.sendbroadcastService.fetchNotificationTypes()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;
        if(this.response.status===0) {
         // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('', 'Country Data Not Found!');
        } else if(this.response.status===1) {
            this.NotificationTypeList = this.response.notificationTypeList;
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


  GetCountriesList() {
    
    return this.sendbroadcastService.GetCountriesList()
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



  GetBroadCastList() {
    
        return this.sendbroadcastService.GetBroadCastList()
        .subscribe(
        (data) => { 
            // this.transactions = data;'
            const datacount = JSON.parse(JSON.stringify(data));
            
            if(datacount.length > 0 ) {
              this.isLoadingResults = false;
              //this.broadcastList = datacount;
              //this.dataSource = datacount; 
              this.dataSource = new MatTableDataSource(datacount); 
              this.dataSource.sort =   this.sort;

              this.dataSource.paginator = this.paginator;
              
            } else {
 
              this.toasterService.error('Manage Broadcast!', 'No Record Found!');
            }
        },
        error => {

        });
  }
    
  deleteBrand(row_obj) {
  
    this.dataSource.data = this.dataSource.data.filter((value,key)=> {
      const hh = (value['id'] !== row_obj.id);
      if(hh===false) {
            this.deleteme(row_obj.id);
      }
      return hh;
    });
  }
 
  deleteme(id) {
        
    const formData = new FormData();
   // this.params = JSON.stringify({'rowId': id, 'tableName':'send_broadcast'});
    formData.append('rowId', id);
    formData.append('tableName', 'send_broadcast');

    this.sendbroadcastService.deleteBroadcast(formData).subscribe(
      (data) => { 
        
          this.response = data;
          if(this.response.status===0) {
          // this.toasterService.success(this.response.msg, 'Manage products!');
              this.toasterService.error('BroadCast Error! ', 'Please Try Again!');
          } else if(this.response.status===1) {
              
              this.toasterService.success('Manage Boradcast!', 'Boradcast Removed!');
              setTimeout(() => {
                window.location.reload();
                }, 1000);
          }
          //console.log(res);
      },
      error => {
        
        //this.loading = false;
    });

  }
 
  fetchAllStates() {
    
    return this.sendbroadcastService.fetchAllStates()
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
 
    return this.sendbroadcastService.fetchAllUserTypes()
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

onImgError(evt) {
  evt.target.src = '';

}

// **************** state work started 
/*
  checkUncheckAll() {
    for (let i = 0; i < this.states.length; i++) {
      this.states[i].isSelected = this.masterSelected;
    }
     this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.states.every(function(item) {
    // console.log(item);
        return item.isSelected === true;
      });
     this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.states.length; i++) {
      if(this.states[i].isSelected) {
      this.checkedList.push(this.states[i]);
      }
    }
    this.checkedList = JSON.stringify(this.checkedList);
    // console.log(this.checkedList);
  }
*/
  // state work ended 

  // **************** UserType work started 
/*
  checkUncheckAllUserType() {
    for (let i = 0; i < this.usertypes.length; i++) {
      this.usertypes[i].isSelected = this.masterUserTypeSelected;
    }
     this.getCheckedItemListUserType();
  }

  isAllSelectedUserType() {
    this.masterUserTypeSelected = this.usertypes.every(function(item) {
    // console.log(item);
        return item.isSelected === true;
      });
     this.getCheckedItemListUserType();
  }

  getCheckedItemListUserType() {
    this.selectedUserType = [];
    for (let i = 0; i < this.usertypes.length; i++) {
      if(this.usertypes[i].isSelected) {
      this.selectedUserType.push(this.usertypes[i]);
      }
    }
    this.selectedUserType = JSON.stringify(this.selectedUserType);
   // console.log(this.selectedUserType);
}
*/
  saveDetails() {

/*
      const notificationTypeid = ((document.getElementById('notificationTypeid') as HTMLInputElement).value);

      alert(notificationTypeid);
   */
    /*y
    alert(this.ShowtoUserList);
return false;

    const notificationTypeid = ((document.getElementById('notificationTypeid') as HTMLInputElement).value);
    if(notificationTypeid==='') {
      this.toasterService.error('Please Try Again!', 'Please Select Notification Type!');
      return false;
    } 
alert('asas');
    const showtouser = ((document.getElementById('showtouser') as HTMLInputElement).value);
    if(showtouser==='') {
      this.toasterService.error('Please Try Again!', 'Please select notification show to user or silent!');
      return false;
    } 
 */
 
const joiningdatefrom = ((document.getElementById('joiningdatefrom') as HTMLInputElement).value);
const joiningdateto = ((document.getElementById('joiningdateto') as HTMLInputElement).value);

    if(this.selectedNotificationTypeList===undefined) {
      this.toasterService.error('Please Try Again!', 'Select notification type field!');
      return false;
    }
 
    if(this.ShowtoUserList===undefined) {
      this.toasterService.error('Please Try Again!', 'Select "notification show to user or silent field!"');
      return false;
    }
   
    const broadcastMsg = ((document.getElementById('broadcastMsg') as HTMLInputElement).value);
    if(broadcastMsg==='') {
        this.toasterService.error('Please Try Again!', 'Please Enter Broadcast Message!');
        return false;
    } 
    
 
    const title = ((document.getElementById('title') as HTMLInputElement).value); 
    const url_link = ((document.getElementById('url_link') as HTMLInputElement).value); 

 
    this.params = JSON.stringify({'stateArray': this.selectedStates, 'userTypeArray':this.selectedUserType, 'BroadcastMsg':broadcastMsg, 'Countries':this.selectedCountries, 'AppVersions':this.selectedAppVersions, 'ActiveInactiveList':this.ActiveInactiveList, 'ShowNitificationToUser':this.ShowtoUserList, 'NotificationType':this.selectedNotificationTypeList, 'url_link':url_link, 'title':title, 'joiningdatefrom':joiningdatefrom,'joiningdateto':joiningdateto});
    const formData = new FormData();
    const fcmimage = ((document.getElementById('fcmimage') as HTMLInputElement).files.length);
    if(fcmimage>0) {
        formData.append('fcmimage', (document.getElementById('fcmimage') as HTMLInputElement).files[0]);
    }
    formData.append('cmd', this.params);
    // formData.append('userTypeArray', this.selectedUserType);
    // formData.append('BroadcastMsg', broadcastMsg);
    this.sendbroadcastService.createBroadcast(formData).subscribe(
      (data) => { 
          this.response = data;
          // console.log(data);
           // return false;
          if(this.response.status===0) {
          // this.toasterService.success(this.response.msg, 'Manage products!');
              this.toasterService.error('BroadCast Error! ', 'Please Try Again!');
          } else if(this.response.status===1) {
              this.toasterService.success('Boradcast Saved!', 'Boradcast Added Successfully!');
              
              setTimeout(() => {
                window.location.reload();
                }, 1000);
                
          } else  if(this.response.status===2) {
             this.toasterService.error('No Record Found!', 'Manage products!');
          }
      },
      error => {
        //this.loading = false;
    });
  }
  // filter function
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  sendBroadCast(id) {
      
    const formData = new FormData();
    this.params = JSON.stringify({'BroadcastId':id});
    formData.append('cmd', this.params);
    // formData.append('userTypeArray', this.selectedUserType);
    // formData.append('BroadcastMsg', broadcastMsg);
    this.sendbroadcastService.SendBroadcast(formData).subscribe(
      (data) => { 
        
          this.response = data;
          if(this.response.status===0) {
          // this.toasterService.success(this.response.msg, 'Manage products!');
              this.toasterService.error('BroadCast Error! ', 'Please Try Again!');
          } else if(this.response.status===1) {
              
              this.toasterService.success('Boradcast Saved!', 'Boradcast Added Successfully!');
              setTimeout(() => {
                window.location.reload();
                }, 1000);
          } else  if(this.response.status===2) {
             this.toasterService.error('No Record Found!', 'Manage products!');
          }
      },
      error => {
        
        //this.loading = false;
    });

  }
}
