import { Component, OnInit, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild  } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';


import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { SendbroadcastService } from '../../../shared/services/sendbroadcast.service';

@Component({
  selector: 'app-userkpidetails',
  templateUrl: './userkpidetails.component.html',
  styleUrls: ['./userkpidetails.component.scss']
})
export class UserkpidetailsComponent implements OnInit {

  title = 'User KPI Details';

  params: any;
  userKPIdetailsList: any; 
  TotalUsers: any;
 
  
  isLoadingResults = false;
  displayedColumnsBroadcasts: string[] = ['Sn', 'person_name', 'app_version', 'last_active_on', 'last_backup','extracted_address','sms_count_success_fail','total_no_of_parties','total_no_of_customers',  'total_no_of_distributors', 'total_no_of_staff', 'total_no_of_other_type', 'last_time_sms_bot_run', 'sms_bot_count', 'total_no_of_voice_notes', 'total_no_transactions', 'total_no_home_expenses_records', 'total_no_of_business_expenses_records', 'total_no_of_pay_by_reminders','total_no_of_pdc','total_no_of_starting_balance_set','total_no_of_doc_attached_to_person_profile','total_deleted_customers','total_no_share_app_clicked','total_no_how_to_use_clicked','total_no_reminder_from_quickview_sent','total_no_of_entry_expense_linked'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private userKpidetailsService: SendbroadcastService,  // users all filer function are available in broadcast service
    public toasterService: ToastrService,
    private router: Router,) { }

  ngOnInit() {

    this.GetUsersKpiList(); // Broadcast List
  }

    GetUsersKpiList() {
      
      return this.userKpidetailsService.GetUserskPIList()
      .subscribe(
      (data) => { 
          // this.transactions = data;'
          const datacount = JSON.parse(JSON.stringify(data));
          
          if(datacount.status===1) {
            this.isLoadingResults = false;
            if(datacount.kpiusersArray.length > 0) {
              //this.userKPIdetailsList = datacount.kpiusersArray; 
              //this.dataSource = datacount.kpiusersArray;
              this.dataSource = new MatTableDataSource(datacount.kpiusersArray);
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
    const email = ((document.getElementById('email') as HTMLInputElement).value);

    const kpifrom = ((document.getElementById('kpifrom') as HTMLInputElement).value);
    const kpito = ((document.getElementById('kpito') as HTMLInputElement).value);

    this.params = JSON.stringify({'userid':userid,'mobile':mobile,'email':email,'kpifrom':kpifrom,'kpito':kpito});
    const formData = new FormData();
    formData.append('cmd', this.params);
 
    this.userKpidetailsService.SearchKPIUser(formData).subscribe(
      (data) => { 
        this.isLoadingResults = false;
        const datacount = JSON.parse(JSON.stringify(data));
       
        if(datacount.status===1) {
            this.isLoadingResults = false;
            if(datacount.kpiusersArray.length > 0) {
              this.userKPIdetailsList = datacount.kpiusersArray; 
              this.dataSource.data = datacount.kpiusersArray;
              this.dataSource.paginator = this.paginator; 
            } else {
              this.toasterService.error('No Record Found!', 'Manage KPI Users!');
            }
        } else if(datacount.status===2) {
          this.toasterService.error('No Record Found!', 'Manage KPI Users!');
        } else {
          this.toasterService.error('Invalid Request!', 'Manage KPI Users!');
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
