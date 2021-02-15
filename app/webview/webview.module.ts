import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatModule } from '../shared/modules/stat/stat.module';

import { AgmCoreModule } from '@agm/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule, 
  MatBadgeModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
 
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTreeModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule
} from '@angular/material';
 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { WebviewRoutingModule } from './webview-routing.module';
import { DiscurrentinventoryComponent } from './discurrentinventory/discurrentinventory.component';  // DynamicComponent
import { PopmodelComponent } from './popmodel/popmodel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditpopmodelComponent } from './editpopmodel/editpopmodel.component';
import { RetailerOrderComponent } from './retailer-order/retailer-order.component';
import { ProductpopupComponent } from './retailer-order/productpopup/productpopup.component';
import { ProductfilterPipe } from './pipe/productfilter.pipe';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';
import { ManageSmsComponent } from './manage-sms/manage-sms.component';
import { InterestRateCalculatorComponent } from './interest-rate-calculator/interest-rate-calculator.component';
import { SearchRetailerComponent } from './search-retailer/search-retailer.component';

// import { DistributorService } from '../shared/services/distributor.service';

@NgModule({
  declarations: [DiscurrentinventoryComponent, PopmodelComponent, EditpopmodelComponent, RetailerOrderComponent, ProductpopupComponent, ProductfilterPipe, MyAlertDialogComponent, ManageSmsComponent, InterestRateCalculatorComponent, SearchRetailerComponent],  // , PopmodelComponent, DynamicComponent
  imports: [
      FormsModule,
      CommonModule,
      StatModule,
      MatTableModule,
      MatTabsModule,
      MatBadgeModule,
      MatPaginatorModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatExpansionModule,
      MatRadioModule,
      MatInputModule,
      MatListModule,
      MatFormFieldModule,
      MatCardModule,
      MatChipsModule,
      MatDialogModule,
      MatButtonToggleModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatSelectModule,
      MatTreeModule,
      FlexLayoutModule, 
      WebviewRoutingModule,
      MatProgressSpinnerModule,
      AgmCoreModule.forRoot({
        // please get your own API key here:
        // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
        apiKey: 'AIzaSyA3Jws4Ms5aCM8ubMsuCaROnfw_8W2qkXs'
      }),
      
  ], 
  entryComponents: [PopmodelComponent,EditpopmodelComponent,ProductpopupComponent,MyAlertDialogComponent
    
  ],
   providers:[]
}) 
export class WebviewModule { }
