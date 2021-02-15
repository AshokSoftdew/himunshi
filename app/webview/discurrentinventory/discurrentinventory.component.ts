import { Component, OnInit, OnChanges,  DoCheck, AfterContentInit, AfterContentChecked,  AfterViewChecked, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { Discurinventory } from './discurinventory';
import { ActivatedRoute, Router} from '@angular/router';
import { DistributorService } from '../../shared/services/distributor.service';
import { AlertService } from '../../shared/services/alert.service';
import { PopmodelComponent } from '../popmodel/popmodel.component';


import { MatDialog, MatDialogConfig, MatDrawerContent, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../shared/services/brand.service';
import { CategoryService } from '../../shared/services/category.service';
import { Brand } from '../../shared/services/brand';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EditpopmodelComponent } from '../editpopmodel/editpopmodel.component';
 
export interface Transaction {
  ProName: string; 
  Id: number;
  ProImage: string;
  SellingPrice: number;
  PurchasePrice: number;
  CurrentInventory: number;
  Category_name: string;

}
      
@Component({
  selector: 'app-discurrentinventory',
  templateUrl: './discurrentinventory.component.html',
  styleUrls: ['./discurrentinventory.component.scss']
})


export class DiscurrentinventoryComponent implements  OnInit {
  
  filteredProduct: any;
  prodetailsArray: Discurinventory[] = [];

  title = 'Manage Inventory';
 
  paramss:any;
  response: any;
  action: string;
  details: any;
  categories: any;
  brands: any;
  userId: any;
  EditProductInfo: any;

  /** Gets the total cost of all transactions. */
  
  constructor(
    private actroute: ActivatedRoute,
    private router: Router,
    private distributorInventoryService: DistributorService,
    private alertService: AlertService,
    public dialog: MatDialog,
    public toasterService: ToastrService,
    //public dialogRef: MatDialogRef<PopmodelComponent>,
    private brandService: BrandService,
    private categoryService: CategoryService,
    // private fb: FormBuilder,
 
    ) { }
    
  


  // prodetailsArray: Discurinventory[] = [];

  displayedColumns = ['ProImage', 'ProName', 'CurrentInventory', 'Action'];
  //  transactions: Transaction[] = [
  
  //    { ProName: 'Fan', Id: 1, ProImage: 'https://img.icons8.com/wired/2x/fan.png', PurchasePrice: 100, SellingPrice: 200,  CurrentInventory: 4, Category_name: 'hello'},
  //    {ProName: 'Tubelight', Id: 2, ProImage: 'https://img.icons8.com/wired/2x/fan.png', PurchasePrice: 100, SellingPrice: 200,  CurrentInventory: 15, Category_name: 'hello'},
  //    {ProName: 'Tyre', Id: 3, ProImage: 'https://img.icons8.com/wired/2x/fan.png', PurchasePrice: 100, SellingPrice: 200,  CurrentInventory: 20, Category_name: 'hello'}
  //  ];


 transactions: Discurinventory[] = [];

 dataSource = new MatTableDataSource<Discurinventory>();
 @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  ngOnInit() {
    this.userId = this.actroute.snapshot.params['userid'];
    
    this.fetchProducts(this.userId);
    
  }
 


  fetchProducts(userId) {

        this.paramss = JSON.stringify({'userid': userId});
        const formData = new FormData();
        formData.append('cmd', this.paramss);
        return this.distributorInventoryService.fetchAllProducts(formData)
        .subscribe(
        (data) => { 
            // this.transactions = data;
            this.response = data;
            if(this.response.status===0) {
             // this.toasterService.success(this.response.msg, 'Manage products!');
                this.toasterService.error(this.response.msg, 'Manage products!');
            } else if(this.response.status===1) {
                this.transactions = this.response.records;
                this.dataSource.data = this.response.records as Discurinventory[];
                this.dataSource.paginator = this.paginator;
               // console.log('ddsfdsfds ' + this.transactions);
            } else  if(this.response.status===2) {
               this.toasterService.error('No Record Found!', 'Manage products!');
            }
        },
        error => {

        });

  }
   


  lgbtnclick(ProductId: number) {
   
    const userid = this.actroute.snapshot.params['userid'];
    
    const ProName = ((document.getElementById('ProName_' + ProductId) as HTMLInputElement).value);
    // ProImage = ((document.getElementById('ProImage_' + ProductId) as HTMLInputElement).value);
    const PurchasePrice = ((document.getElementById('PurchasePrice_' + ProductId) as HTMLInputElement).value);
    const SellingPrice = ((document.getElementById('SellingPrice_' + ProductId) as HTMLInputElement).value);
    const CurrentInventory = ((document.getElementById('CurrentInventory_' + ProductId) as HTMLInputElement).value);
   
      this.prodetailsArray.push({'Id': ProductId, 'ProName': ProName,  'PurchasePrice': PurchasePrice, 'SellingPrice': SellingPrice, 'CurrentInventory': CurrentInventory, 'userid': userid });
      this.distributorInventoryService.updateInventory(this.prodetailsArray).subscribe(res => {
      // this.isLoadingResults = false;
          this.toasterService.success('Manage products!', 'Product Updated!');
          this.router.navigate(['/webview/manageinventory/' + userid]);
      }, (error) => {
          this.alertService.error(error);
        // this.isLoadingResults = false;
      }
      
  );
    
    this.prodetailsArray = [];
  }
  

  EditMe(productId) {
   
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
     
     // getting Productdata by product Id for editing
      this.paramss = JSON.stringify({'userid': this.userId, 'ProductId':productId});
      const formData = new FormData();
      formData.append('cmd', this.paramss);
 
      return this.distributorInventoryService.getProductById(formData).subscribe(
        (data) => { 
            // this.transactions = data;
            this.response = data;
            
            if(this.response.status===1) {
                this.EditProductInfo = this.response.records;
                 
                // sending product Information to POP and Getting Details for Categegory and Brands
                const dialogRef = this.dialog.open(EditpopmodelComponent, {
                  data: { ProductInfo: this.EditProductInfo, userid: this.userId,  productId: this.EditProductInfo.Id, action: 'Edit Product'}  // , brandName: brand_name
                }); 

               
            } else {
               this.toasterService.error('No Record Found!', 'Manage products!');
            } 
        },
        error => {
          this.toasterService.error('No Record Found!', 'Manage products!');
        });
      
     
  }
  

  openCreate() {

     const userId = this.actroute.snapshot.params['userid'];
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     
     const dialogRef = this.dialog.open(PopmodelComponent, {
      // maxWidth: '85vw',
      // maxHeight: '100vh',
      // width: '500px',
      // height: '85vh', 
      data: { userid: userId, action: 'Create Product'}
      }); 

 
      dialogRef.afterClosed().subscribe(result => {
        console.log('afterClosed called');
        this.userId = this.actroute.snapshot.params['userid'];
        this.fetchProducts(userId);
      });
  
  }

 

}



