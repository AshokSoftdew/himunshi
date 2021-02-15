import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BrowserModule, Title, DomSanitizer  } from '@angular/platform-browser';

import { MatDialog, MatDialogConfig, MatDrawerContent, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';

@Component({
  selector: 'app-interest-rate-calculator',
  templateUrl: './interest-rate-calculator.component.html',
  styleUrls: ['./interest-rate-calculator.component.scss']
})
export class InterestRateCalculatorComponent implements OnInit {

  Curr: any;
  lang: any;
  sipStringWithArgu: any;
  sipString: any;
  currentUrl: any;
  constructor(private actroute: ActivatedRoute,
    private router: Router,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {

/* 
    //alert(this.router.url);
    this.Curr = this.actroute.snapshot.params['id'];
    //alert(this.Curr);
    if (this.router.url.includes('=')) {
        this.currentUrl = this.router.url.split('=');
        alert('yes equalto');
        console.log(this.currentUrl);
    } else {
 */

      this.Curr = this.actroute.snapshot.params['Curr'];
      this.lang = this.actroute.snapshot.params['lang'];
  
      if((this.Curr===undefined) && (this.lang===undefined)) {
        this.Curr = 'INR';
        this.lang = 'en';
      } else if((this.Curr===undefined) && (this.lang!==undefined)) {
         
        this.Curr = 'INR';
  
      } else if((this.Curr!==undefined) && (this.lang===undefined)) {
  
        this.lang = 'en';
  
      } else {
          if(this.Curr==='') {
            this.Curr = 'INR';
              //alert(this.Curr);
          }
      }
   /*  } */
    
    //this.currentUrl = this.router.url.split('=');
    //alert(this.lang);
    //alert(this.Curr);
    this.sipStringWithArgu = 'https://www.himunshi.com/webapi/backend/sipcalculator/home-loan-interest-rate-calculator.php?cur='+this.Curr+'&lang='+this.lang;
    // this.sipString = this.sanitizer.bypassSecurityTrustResourceUrl(this.sipStringWithArgu);
    window.location.href = this.sipStringWithArgu;
  }



}
