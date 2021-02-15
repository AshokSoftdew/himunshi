import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscurrentinventoryComponent } from './discurrentinventory/discurrentinventory.component';
import { RetailerOrderComponent } from './retailer-order/retailer-order.component';
import { ManageSmsComponent } from './manage-sms/manage-sms.component';
import { InterestRateCalculatorComponent } from './interest-rate-calculator/interest-rate-calculator.component';
import { SearchRetailerComponent } from './search-retailer/search-retailer.component';

const routes: Routes = [{
  path: 'webview',
  children: [/* {
              // http://localhost:4200/webview/interest-rate-calculatorlang=hi&userid=91
              path: ':id',
              component: InterestRateCalculatorComponent
             }, */{
               // http://localhost:4200/webview/interest-rate-calculator/3877/en
              path: 'interest-rate-calculator/:Curr/:lang',
              component: InterestRateCalculatorComponent
             },
       /*  {
          path: 'manageinventory/:userid',
          component: DiscurrentinventoryComponent
        },
        {
          path: 'retailer/:distributorId/:retailerId',
          component: RetailerOrderComponent
        },{
          path: 'manage-sms/:userId',
          component: ManageSmsComponent
        },{
          path: 'manage-sms/:userId',
          component: ManageSmsComponent
        },
        {
          path: 'interest-rate-calculator/:Curr/:lang',
          component: InterestRateCalculatorComponent
        },{
          path: 'interest-rate-calculator/:Curr',
          component: InterestRateCalculatorComponent
        },{
          path: 'interest-rate-calculator',
          component: InterestRateCalculatorComponent
        },{
          path: 'search-retailer/:userId',
          component: SearchRetailerComponent
        }, */
  ]
},
  
  //{path: 'webview/interest-rate-calculatorlang', pathMatch: 'webview/interest-rate-calculatorlang', component: InterestRateCalculatorComponent},
  //{path: 'webview/interest-rate-calculatorlang=hi&userid=91', component: InterestRateCalculatorComponent},

];








/*  [
  {path: 'webview/manageinventory/:userid', component: DiscurrentinventoryComponent},
  {path: 'webview/retailer/:distributorId/:retailerId', component: RetailerOrderComponent},
  {path: 'webview/manage-sms/:userId', component: ManageSmsComponent},
  {path: 'webview/interest-rate-calculator/:Curr/:lang', component: InterestRateCalculatorComponent},
  {path: 'webview/interest-rate-calculator/:Curr', component: InterestRateCalculatorComponent},
  
  //{path: 'webview/interest-rate-calculatorlang', pathMatch: 'webview/interest-rate-calculatorlang', component: InterestRateCalculatorComponent},
  //{path: 'webview/interest-rate-calculatorlang=hi&userid=91', component: InterestRateCalculatorComponent},


  {path: 'webview/interest-rate-calculator', component: InterestRateCalculatorComponent},
  {path: 'webview/search-retailer/:userId', component: SearchRetailerComponent},
  
]; */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebviewRoutingModule { }
