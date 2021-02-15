import { Component, OnInit, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';

import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { BukusettingsService } from '../../../shared/services/bukusettings.service';

import * as $ from 'jquery';


@Component({
  selector: 'app-bukusettings',
  templateUrl: './bukusettings.component.html',
  styleUrls: ['./bukusettings.component.scss']
})
export class BukusettingsComponent implements OnInit {

  title = 'Manage Munshi Settings';
  isLoadingResults = true;
  response: any;
  bukusettings: any;
 
  bukuSettingForm : FormGroup;

  isdCodes :any = [];
  selectedisd :any = [];
  selectedsupport :any = [];

  checkboxHTML: string;

  constructor(private bukusettingService: BukusettingsService,
              public toasterService: ToastrService, 
              private router: Router, 
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {

    

    this.bukuSettingForm = this.formBuilder.group({
                                  android_latest_app_version: ['', [Validators.required]],
                //ios_latest_app_version: ['', []],
                                  max_allowable_free_customer: ['', [Validators.required]],
                //cash_sale: ['', [Validators.required]],
                                  // max_daily_free_sms: ['', [Validators.required]],
                // report_excel_download: ['', [Validators.required]],
                                   message_to_show: ['', []],
                                   message_id: ['', []],
                                  mark_attendance: ['', [Validators.required]],
                                  whatsapp_support: ['', [Validators.required]]
                                });
 
      this.getBukuSettings(); 
    
// {"name":"Pakistan","dial_code":"+92","code":"PK"},
      /*   this.isdCodes = [{'name':'India','dial_code':'+91','code':'IN'},
                        {'name':'Bangladesh','dial_code':'+880','code':'BD'},
                        {'name':'Ecuador','dial_code':'+593','code':'EC'},
                        {'name':'Pakistan','dial_code':'+92','code':'PK'},
                        {'name':'Egypt','dial_code':'+20','code':'EG'}]; */
                        this.isdCodes = [{'name':'Pakistan','dial_code':'+92','code':'PK'}];

                        $(document).ready(function () {
               
                            $('.getcheckboxValuesKeyup').on('keyup', function() {
                                const countryArray = [];
                                $('input:checkbox[class=getcheckboxValues]:checked').each(function () {
                                 
                                     const CountryValue =  $(this).val();
                                     const smscount = $('#text_'+CountryValue).val();

                                    countryArray.push({'countryCode':$(this).val(), 'smsCount':smscount});
                                });
                    
                                   $('#countryJson').val(JSON.stringify(countryArray));
                            });

                            $('.getcheckboxValues').on('change', function() {
                              
                                const countryArray = [];
                                $('input:checkbox[class=getcheckboxValues]:checked').each(function () {
                                 
                                  const CountryValue =  $(this).val();
                                  const smscount = $('#text_'+CountryValue).val();

                                  countryArray.push({'countryCode':$(this).val(), 'smsCount':smscount});
                                  
                                });
                   
                                $('#countryJson').val(JSON.stringify(countryArray));
                            });
 




                            // for whatsapp support numbers
                            $('.getWhatsappValuesKeyup').on('keyup', function() {
                              const countrysupportArray = [];
                              $('input:checkbox[class=getWhatsappValues]:checked').each(function () {
                               
                                   const CountrySupportValue =  $(this).val();
                                   const supportnumber = $('#support_'+CountrySupportValue).val();

                                  countrysupportArray.push({'countryCode':$(this).val(), 'no':supportnumber});
                              });
                  
                                 $('#whatssupportJson').val(JSON.stringify(countrysupportArray));
                          });
                          
                          $('.getWhatsappValues').on('change', function() {
                            
                              const countrysupportArray = [];
                              $('input:checkbox[class=getWhatsappValues]:checked').each(function () {
                               
                                const CountrySupportValue =  $(this).val();
                                const supportnumber = $('#support_'+CountrySupportValue).val();

                                countrysupportArray.push({'countryCode':$(this).val(), 'no':supportnumber});
                                
                              });
                 
                              $('#whatssupportJson').val(JSON.stringify(countrysupportArray));
                          });
                        });
  } 

  saveBukuSetting() {
 
      this.selectedisd = ((document.getElementById('countryJson') as HTMLInputElement).value);
      this.selectedsupport = ((document.getElementById('whatssupportJson') as HTMLInputElement).value);
     // JSON.parse(

      // this.isLoadingResults = true;
      const formData = new FormData();
 
      formData.append('android_latest_app_version', this.bukuSettingForm.get('android_latest_app_version').value);
      //formData.append('ios_latest_app_version', this.bukuSettingForm.get('ios_latest_app_version').value);
      formData.append('max_allowable_free_customer', this.bukuSettingForm.get('max_allowable_free_customer').value);
//formData.append('cash_sale', this.bukuSettingForm.get('cash_sale').value);
      formData.append('cash_sale', '0');
     // formData.append('max_daily_free_sms', this.bukuSettingForm.get('max_daily_free_sms').value);
//formData.append('report_excel_download', this.bukuSettingForm.get('report_excel_download').value);
      formData.append('report_excel_download', '0');
      formData.append('message_to_show', this.bukuSettingForm.get('message_to_show').value);
      formData.append('message_id', this.bukuSettingForm.get('message_id').value);
      formData.append('mark_attendance', this.bukuSettingForm.get('mark_attendance').value);
      formData.append('whatsapp_support', this.selectedsupport);
      formData.append('isds', this.selectedisd);
  
      formData.append('ID', '1');

      this.bukusettingService.updateSetting(formData).subscribe(
        (data) => {
          
            this.response = data;
            if(this.response.status===0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
                this.toasterService.error('Manage Munshi Settings!', 'Error occured! Please Try Again!');
                 
            } else if(this.response.status===1) {
                // this.isLoadingResults = false;
                this.toasterService.success('Manage Munshi Settings!', 'Settings Updated!');
                // setTimeout(() => {
                //   window.location.reload();
                //   }, 2000);
            }
        },
        error => {
          //this.loading = false;
      });
  }

  getBukuSettings() {

    return this.bukusettingService.bukuSettings()
    .subscribe(
    (data) => { 
        // this.transactions = data;
        this.response = data;
        if(this.response.status===0) {
           // this.toasterService.success(this.response.msg, 'Manage products!');
           // this.toasterService.error(this.response.msg, 'Manage products!');
        } else if(this.response.status===1) {
              this.bukusettings = this.response.records;
            
             
              if(this.response.records.ISDs!=='') {
                  const parseJson = JSON.parse(this.response.records.ISDs);
                  $('#countryJson').val(this.response.records.ISDs);

                  $(document).ready(function () {

                    for(let i=0; i < parseJson.length; i++) {

                      $('#countryCode_'+parseJson[i].countryCode).prop( 'checked', true );
                      $('#text_'+parseJson[i].countryCode).val(parseJson[i].smsCount);
                    }

                  });
              }

              if(this.response.records.whatsapp_support!=='') {
                const parseJsonSupport = JSON.parse(this.response.records.whatsapp_support);
                $('#whatssupportJson').val(this.response.records.whatsapp_support);

                $(document).ready(function () {

                  for(let i=0; i < parseJsonSupport.length; i++) {

                    $('#SupportcountryCode_'+parseJsonSupport[i].countryCode).prop( 'checked', true );
                    $('#support_'+parseJsonSupport[i].countryCode).val(parseJsonSupport[i].no);
                  }
                    
                });
            }
  
            // this.selectedisd = this.response.records.ISDs;

            this.bukuSettingForm.setValue({
              android_latest_app_version: this.response.records.android_latest_app_version,
              //ios_latest_app_version: this.response.records.ios_latest_app_version,
              max_allowable_free_customer: this.response.records.max_allowable_free_customer, 
    // cash_sale: this.response.records.cash_sale,
              // max_daily_free_sms:this.response.records.max_daily_free_sms,
    //report_excel_download: this.response.records.report_excel_download,
              message_to_show: this.response.records.message_to_show, 
              message_id: this.response.records.message_id, 
              mark_attendance: this.response.records.mark_attendance, 
              whatsapp_support: this.response.records.whatsapp_support
              
            });

           // this.selectedisd = ['EG','EG'];  [this.response.records.ISDs]

          this.isLoadingResults = false;
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
