import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogConfig, MatDrawerContent, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { SharedappService } from '../sharedapp.service';

@Component({
  selector: 'app-shareapp',
   templateUrl: './shareapp.component.html',
  styleUrls: ['./shareapp.component.scss']
})
export class ShareappComponent implements OnInit {

  utm_source: any;
  utm_medium: any;
  
  utm_campaign : string | undefined;
  response: any;

  constructor(  private actroute: ActivatedRoute, 
                private router: Router,
                
                private sharedappService: SharedappService,
                private toasterService: ToastrService,



      ) { }

  ngOnInit() {

    this.utm_source = this.actroute.snapshot.params['utm_source'];
    this.utm_medium = this.actroute.snapshot.params['utm_medium'];
    this.utm_campaign = this.actroute.snapshot.params['utm_campaign'];
    if(this.utm_campaign === undefined) {
      this.utm_campaign = '';
    }


    // http://localhost:4200/share/share_app/referral/S1omNAIDRVIWWUQVDVMVAFNDVxYrNUJaXkZSVEBSQV5FQVsmNAELNyI8JQ
    // http://localhost:4200/share/share_app/referral/RC8mQQcAQlVDCBQVWgJMBQcUAzUrREZXVkBRUURWR1tMQi8mEQolNys7
    // http://localhost:4200/share/share_app/referral/PjsoNTUhMhs4ESRCIQwXUCoiIDQmISZcKTA1VzgmHhM7GC0nLjNQNjMxLgI%2BPltJ
    // http://hibuku.com/app/share/share_app/referral/PjsoNTUhMhs4ESRCIQwXUCoiIDQmISZcKTA1VzgmHhM7GC0nLjNQNjMxLgI%2BPltJ
    // http://hibuku.com/app/share/share_app/referral/RC8mQQcAQlVDCBQVWgJMBQcUAzUrREZXVkBRUURWR1tMQi8mEQolNys7

    
     this.GoToPlaystore(this.utm_source, this.utm_medium, this.utm_campaign);

  }


  GoToPlaystore(utm_source, utm_medium, utm_campaign) {
    
           // this.isLoadingResults = true;
      const formData = new FormData();


      formData.append('utm_source', utm_source);
      formData.append('utm_medium', utm_medium);
      formData.append('utm_campaign', utm_campaign);
      formData.append('utm_campaign', utm_campaign);

      this.sharedappService.sharedApp(formData).subscribe(
        (data) => {
          
            this.response = data;
           //alert(this.response.status);
         //  alert(this.response.res);
           window.location.href =this.response.res;
            if(this.response.status===0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
                // this.toasterService.error('Manage Munshi Settings!', 'Error occured! Please Try Again!');
                 
            } else if(this.response.status===1) {
                // this.isLoadingResults = false;
                // this.toasterService.success('Manage Munshi Settings!', 'Settings Updated!');
                // setTimeout(() => {
                //   window.location.reload();
                //   }, 2000);
            }
        },
        error => {
          //this.loading = false;
      });


  }

}
