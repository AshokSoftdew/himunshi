import { Component, OnInit, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild  } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';


import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { SendbroadcastService } from '../../../shared/services/sendbroadcast.service';




@Component({
  selector: 'app-user-ledger',
  templateUrl: './user-ledger.component.html',
  styleUrls: ['./user-ledger.component.scss']
})
export class UserLedgerComponent implements OnInit {

  title = 'User Ledger Details';

  params: any;
  userLedgerdetailsList: any; 
  TotalUsers: any;
 
  
  isLoadingResults = false;
  displayedColumnsBroadcasts: string[] = ['Sn', 'person_name', 'app_version', 'last_active_on', 'last_backup','extracted_address','u_server_id','SetShopDate', 'business_name','m_business_reg_type_id','m_business_category_id', 'currency', 'created_on'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private userLedgerdetailsService: SendbroadcastService,  // users all filer function are available in broadcast service
    public toasterService: ToastrService,
    private router: Router,) { }

  ngOnInit() {

    this.GetUsersLedgerList(); // Broadcast List

  }


  GetUsersLedgerList() {
      
    return this.userLedgerdetailsService.GetUsersLedgerList()
    .subscribe(
    (data) => { 
        // this.transactions = data;'
        const datacount = JSON.parse(JSON.stringify(data));
        
        if(datacount.status===1) {
          this.isLoadingResults = false;
          if(datacount.usersLedger.length > 0) {
            //this.userLedgerdetailsList = datacount.usersLedger; 
            //this.dataSource.data = datacount.usersLedger;
            this.dataSource = new MatTableDataSource(datacount.usersLedger);
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
  //const mobile = ((document.getElementById('mobile') as HTMLInputElement).value);
  //const email = ((document.getElementById('email') as HTMLInputElement).value);

  const ledgerfrom = ((document.getElementById('ledgerfrom') as HTMLInputElement).value);
  const ledgerto = ((document.getElementById('ledgerto') as HTMLInputElement).value);
// 'mobile':mobile,'email':email,
  this.params = JSON.stringify({'userid':userid,'ledgerfrom':ledgerfrom,'ledgerto':ledgerto});
  const formData = new FormData();
  formData.append('cmd', this.params);

  this.userLedgerdetailsService.SearchLedgerUser(formData).subscribe(
    (data) => { 
      this.isLoadingResults = false;
      const datacount = JSON.parse(JSON.stringify(data));
     
      if(datacount.status===1) {
          this.isLoadingResults = false;
          if(datacount.usersLedger.length > 0) {
            //this.userLedgerdetailsList = datacount.usersLedger; 

            //this.dataSource.data = datacount.usersLedger;
            this.dataSource = new MatTableDataSource(datacount.usersLedger);
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
