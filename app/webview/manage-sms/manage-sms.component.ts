import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { MatDialog, MatDialogConfig, MatDrawerContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { concatAll } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


import { BukusettingsService } from '../../shared/services/bukusettings.service';

interface SMSoption {

  id: string;
  val: string;
  sms: string;

}

@Component({
  selector: 'app-manage-sms',
  templateUrl: './manage-sms.component.html',
  styleUrls: ['./manage-sms.component.scss']
})
export class ManageSmsComponent implements OnInit {

  userId: any;
  params: any;
  response: any;
  bukulogo: any;
  bukusettings: any;
  free_messages: any = 'X';
 
  favoriteSeason: string;


  sms_options: SMSoption[] = [{id:'1',val:'100', sms:'1000'}, {id:'2',val:'200', sms:'2000'}, {id:'3',val:'300', sms:'3000'}];
 

  constructor(private actroute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public toasterService: ToastrService,
    private smsSettingsService: BukusettingsService,) {    // getting buku setting service because need free sms key from database


     }

  ngOnInit() {
    
    this.userId = this.actroute.snapshot.params['userId'];
    this.bukulogo = environment.defaultImageURL+'assets/images/bukulogo.png';
    
    this.getBukuSettings();
    //  alert(this.userId);
  }

  saveManageSms() { 

    alert('ashok ');
  }

  
  getBukuSettings() {

    return this.smsSettingsService.bukuSettings()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;

        
        if(this.response.status===0) {
           // this.toasterService.success(this.response.msg, 'Manage products!');
           // this.toasterService.error(this.response.msg, 'Manage products!');
        } else if(this.response.status===1) {
         
            this.bukusettings = this.response.records;
            if(this.bukusettings.free_sms_service==='1') {
                this.free_messages = this.bukusettings.max_daily_free_sms;
            }
         
     
            // this.isLoadingResults = false;
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








}
