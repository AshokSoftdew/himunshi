import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';


import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { SendbroadcastService } from '../../../shared/services/sendbroadcast.service';

@Component({
  selector: 'app-staff-service',
  templateUrl: './staff-service.component.html',
  styleUrls: ['./staff-service.component.scss']
})
export class StaffServiceComponent implements OnInit {

  title = 'Staff Feature Activation Details';

  params: any;
  userLedgerdetailsList: any; 
  TotalUsers: any;

  response: any;
  states: any;
  selectedFeatureType:any; 
  featuretypes:any =[{'id':1,'featuretype':'EMI Activation'}, {'id':2,'featuretype':'Staff Activation'}];
  isLoadingResults = true;
  displayedColumnsBroadcasts: string[] = ['Sn', 'feature_type','person_name', 'extracted_address', 'joined_on', 'last_active_on', 'free_trial_start_date', 'paid_start_date', 'valid_till', 'disabled_on',  'send_FCM', 'action'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private StaffFeatureActivationService: SendbroadcastService,  // users all filer function are available in broadcast service
    public toasterService: ToastrService,
    private router: Router,) { }

  ngOnInit() {

    this.GetStaffFeatureEnabledUsersList(); 

  }

  
  GetStaffFeatureEnabledUsersList() {
      
    return this.StaffFeatureActivationService.GetStaffFeatureEnabledUsersList()
    .subscribe(
    (data) => { 
        // this.transactions = data;'
        const datacount = JSON.parse(JSON.stringify(data));
        
        if(datacount.status===1) {
          this.isLoadingResults = false;
          if(datacount.usersStaff.length > 0) {
            //this.userLedgerdetailsList = datacount.usersLedger; 
            //this.dataSource.data = datacount.usersLedger;
            this.dataSource = new MatTableDataSource(datacount.usersStaff);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator; 
          } else {
            this.toasterService.error('No Record Found!', 'Manage KPI Users!');
          }
      } else if(datacount.status===2) {
        this.toasterService.error('No Record Found!', 'Manage KPI Users!');
      } else {
        this.toasterService.error('Invalid Request!', 'Manage KPI Users!');
      }
    },
    error => {

    });
 }

 filterDetails() {
        
  this.isLoadingResults = true;
  const userid = ((document.getElementById('userid') as HTMLInputElement).value);
  const mobile = ((document.getElementById('mobile') as HTMLInputElement).value);
  //const email = ((document.getElementById('email') as HTMLInputElement).value);

  const userfrom = ((document.getElementById('userfrom') as HTMLInputElement).value);
  const userto = ((document.getElementById('userto') as HTMLInputElement).value);
// 'mobile':mobile,'email':email,
  this.params = JSON.stringify({'userid':userid,'userfrom':userfrom,'userto':userto, 'FeatureuserTypeArray':this.selectedFeatureType, 'mobile':mobile});
  const formData = new FormData();
  formData.append('cmd', this.params);

  this.StaffFeatureActivationService.SearchStaffUser(formData).subscribe(
    (data) => { 
      this.isLoadingResults = false;
      const datacount = JSON.parse(JSON.stringify(data));
     
      if(datacount.status===1) {
          this.isLoadingResults = false;
          if(datacount.usersStaff.length > 0) {

            this.dataSource = new MatTableDataSource(datacount.usersStaff);
              this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator; 
          } else { 
            this.toasterService.error('No Record Found!', 'User Not found!');
          }
      } else if(datacount.status===2) {
        this.toasterService.error('No Record Found!', 'User Not found!');
      } else {
        this.toasterService.error('Invalid Request!', 'User Not found!');
      }
     
       
    },
    error => {
      
      //this.loading = false;
  });

}

sendFCMAndNotifyUser(id, userid, featureType, valid_till) {
      
  const formData = new FormData();
  this.params = JSON.stringify({'RowId':id,'UserId':userid,'FeatureType':featureType, 'valid_till':valid_till});
  formData.append('cmd', this.params);
  // formData.append('userTypeArray', this.selectedUserType);
  // formData.append('BroadcastMsg', broadcastMsg);
  this.StaffFeatureActivationService.sendFCMAndNotifyUser(formData).subscribe(
    (data) => { 
      
        this.response = data;
        if(this.response.status===0) {
        // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('Notification Error! ', this.response.Msg);
        } else if(this.response.status===1) {
            
            this.toasterService.success('Notification Success!', this.response.Msg);
           /*  setTimeout(() => {
              window.location.reload();
              }, 1000); */ 
        } else  if(this.response.status===2) {
           this.toasterService.error('No Record Found!', 'Manage Staff Feature Activation!');
        }
    },
    error => {
      
      //this.loading = false;
  });

} 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
