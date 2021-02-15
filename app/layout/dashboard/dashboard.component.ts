import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, } from '@angular/material';
import { ActivatedRoute, Router} from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets, ChartDataSets as LangBarChartData, ChartDataSets as CountryiesBarChartData, ChartDataSets as AppVersionBarChartData, ChartDataSets as BusinessCateChartData, ChartDataSets as ServiceCateChartData } from 'chart.js';
import { Label } from 'ng2-charts';

import { formatDate } from '@angular/common';

import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';

// import { TranslateService } from '@ngx-translate/core';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    Labels: any; 
    params: any; 
    TodayDate: any; 
    NewUsers: any; 
    ReturningUsersCount: any; 
    TotalCountriesOfUsers: any; 
    TotalReferrals: any; 
    TotalBackupUpUsersCount: any; 
    EMIActivationFeatureCount: any; 
    //TotalNotActiveOnAppUserCount: any; 
    TotalCountDontHaveGCMID: any; 

    displayedColumnsSigned: any;
    SignedUpUsersSourceCount: any;
    heading: any;
    isLoadingResults = true;
    sentSMS: any;
    failSMS: any;
    SMSstring: any;
    
    @ViewChild(MatSort) sort: MatSort;

    myDate = new Date();
    StaffServiceEnabledUsers: any;
    constructor(private Dashboardservice: DashboardService, 
        public toasterService: ToastrService,
        private router: Router) {

        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:  'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description: 'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    public barChartOptions: ChartOptions = {
        responsive: true,
    };
    LangbarChartLabels: Label[] =[];
    BusinessCatArrayChartLabels: Label[] =[];
    ServiceCatArrayChartLabels: Label[] =[];

    barChartLabels: Label[] =[]; // '2006', '2007', '2008', '2009', '2010', '2011', '2012'
    CountriesUsersbarChartLabels: Label[] =[];
    AppVersionbarChartLabels: Label[] =[];

    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartPlugins = [];
 
    barChartData: ChartDataSets[] = [
         { data: [], label: 'Total Referrals' },  //65, 59, 80, 81, 56, 55, 40
         { data: [], label: 'New Users' },  // 28, 48, 40, 19, 86, 27, 90
         { data: [], label: 'Active Users' }  // 28, 48, 40, 19, 86, 27, 90
    ];


    LangbarChartData: LangBarChartData[] = [
        { data: [], label: 'Language Wise Users' }  // 65, 59, 80, 81, 56, 55, 40
    ];

    CountryiesbarChartData: CountryiesBarChartData[] = [
        { data: [], label: 'Users Count From Countries' },
        { data: [], label: 'Last Active Users Count From Countries' }
    ];

    AppVersionbarChartData: AppVersionBarChartData[] = [
        { data: [], label: 'Appversion Wise Users' },
        { data: [], label: 'Appversion Wise Active Users' }
    ];

    BusinessCateChartData: BusinessCateChartData[] = [
        { data: [], label: 'Business Category Wise Users' },
    ];

    ServiceCateChartData: ServiceCateChartData[] = [
        { data: [], label: 'Service Category Wise Users' },
    ];

    

    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource();
    //dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];

    response: any;
    FromDate: any;
    ToDate: any;

    Barcolors = [
        { backgroundColor:'#26c6da' },
        { backgroundColor:'#ec407a' },
        { backgroundColor:'#66bb6a' },
       // { backgroundColor:'blue' },
        //{ backgroundColor:"yellow" }
      ];
    
    CountriesBarcolors = [
        { backgroundColor:'#ffa726' },
        { backgroundColor:'#66bb6a' },
       // { backgroundColor:'blue' },
        //{ backgroundColor:"yellow" }
    ];
      
    LangBarcolors = [
        { backgroundColor:'#26c6da' },
    ];
 
    BusinessCateBarcolors = [
        { backgroundColor:'#ec407a' },
    ];

    ServiceCateBarcolors = [
        { backgroundColor:'#66bb6a' },
    ];

    AppversionBarcolors = [
        { backgroundColor:'#ec407a' },
        { backgroundColor:'#66bb6a' }
       
    ];

      
      



    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngOnInit() {
        //this.TodayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
       
        this.NewUsers = 0;
        this.ReturningUsersCount = 0;
        this.fetchChartsData(this.FromDate, this.ToDate);

    }


    ShowUsersOnGraph() {
        const newusersfrom = ((document.getElementById('newusersfrom') as HTMLInputElement).value);
        const newusersto = ((document.getElementById('newusersto') as HTMLInputElement).value);

        this.fetchChartsData(newusersfrom, newusersto);
    }




    fetchChartsData(fromDate, toDate) {
      // Dashboard/charts.php?cmd={"fromDate":fromDate,"toDate":"2020-03-22"}
      this.params = JSON.stringify({'fromDate': fromDate, 'toDate':toDate});
      const formData = new FormData();
      formData.append('cmd', this.params);
       
       
        this.Dashboardservice.fetchChartsData(formData).subscribe(
        (data) => { 
            this.isLoadingResults = false;
           // this.response = data;
            this.response =JSON.parse(JSON.stringify(data));
            //alert(this.response);
            if(this.response.JoiningArray.length>0) {
                this.barChartLabels =  this.response.JoiningArray.slice();

                const FirstTotalReferrals =  this.response.FirstTotalReferrals.slice();
                const NewUsersArray =  this.response.UserCountArray.slice();
                const ActiveusersCount =  this.response.ActiveusersCount.slice();
                this.NewUsers = this.response.TodayUsers;
                this.ReturningUsersCount = this.response.ReturningUsersCount;
                this.barChartData = [
                    { data: FirstTotalReferrals, label: 'Total Referrals' },
                    { data: NewUsersArray, label: 'New Users' },
                     { data: ActiveusersCount, label: 'Active Users' }
                ];

                /* For Language Graph */
                const LanguageUsers =  this.response.LanguageUsers.slice();
                this.LangbarChartLabels =  this.response.languages.slice();
                this.LangbarChartData = [
                    { data: LanguageUsers, label: 'Language Wise Users' }
                ];

                /* For Countries User and Last Login From Countries Graph */
                
                this.CountriesUsersbarChartLabels =  this.response.CountriesUsers.slice();
                const CountriesUsersCount =  this.response.CountriesUsersCount.slice();
                const CountriesUsersCountLastActive =  this.response.CountriesUsersCountLastActive.slice();
                this.CountryiesbarChartData = [
                    { data: CountriesUsersCount, label: 'Users Count From Countries' },
                    { data: CountriesUsersCountLastActive, label: 'Last Active Users Count From Countries' }
                ];
                
                // commented
                // this.TotalCountriesOfUsers = this.response.TotalCountriesOfUsers;
                // Tikki Referrals
                this.TotalReferrals = this.response.TotalReferrals;

                /* For App version wise users */
                                
                this.AppVersionbarChartLabels =  this.response.AllVersion.slice();
                const VersionwiseUsers =  this.response.VersionwiseUsers.slice();
                const VersionwiseActiveUsers =  this.response.VersionwiseActiveUsers.slice();
                this.AppVersionbarChartData = [
                    { data: VersionwiseUsers, label: 'Appversion Wise Users' },
                    { data: VersionwiseActiveUsers, label: 'Appversion Wise Active Users' },
                ];

                
 
                this.TotalBackupUpUsersCount =  this.response.TotalBackupUpUsersCount;
               // commented 
                // this.EMIActivationFeatureCount =  this.response.EMIActivationFeatureCount;
                this.TotalCountDontHaveGCMID =  this.response.TotalCountDontHaveGCMID;

                // SignupUserd from Campaign
                this.displayedColumnsSigned =  this.response.SignedUpUsersSource;
                this.SignedUpUsersSourceCount = this.response.SignedUpUsersSourceCount;

                // Sent or Fail SMS Count
                this.sentSMS = this.response.sentSMS;
                this.failSMS = this.response.failSMS;
                this.SMSstring = this.sentSMS +'/'+ this.failSMS;

                // commented
                // this.StaffServiceEnabledUsers = this.response.StaffServiceEnabledUsers;


                /* For Business Category */
                const BusinessCatresultArray =  this.response.BusinessCatresultArray.slice();
                this.BusinessCatArrayChartLabels =  this.response.BusinessCatArray.slice(); // LangbarChartLabels
                this.BusinessCateChartData = [
                    { data: BusinessCatresultArray, label: 'Business Category Wise Users' }
                ];

                /* For Service Category */
                const ServiceCatresultArray =  this.response.ServiceCatresultArray.slice();
                this.ServiceCatArrayChartLabels =  this.response.ServiceCatArray.slice(); // LangbarChartLabels
                this.ServiceCateChartData = [
                    { data: ServiceCatresultArray, label: 'Service Category Wise Users' }
                ];

              


                /* this.response.JoiningArray.forEach(function (dataset, i) {
                    dataset.data = newDataValues[i].data;
                    if (newDataValues[i].pointBorderColor) {
                        dataset.pointBorderColor = newDataValues[i].pointBorderColor;
                    }
                    if (newDataValues[i].label) {
                        dataset.label = newDataValues[i].label;
                    }
                }); */
            }
        },
        error => {
            
            //this.loading = false;
        });
    }


    /* chartColors() {
        return [{ backgroundColor: '#FF7360' }, { backgroundColor: '#6FC8Ce' }
      ];
    } */

}
