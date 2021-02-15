import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDrawerContent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DistributorService } from '../../shared/services/distributor.service';
import { ToastrService } from 'ngx-toastr';
import { Discurinventory } from '../discurrentinventory/discurinventory';
import { CategoryService } from '../../shared/services/category.service';
import { BrandService } from '../../shared/services/brand.service';

export interface Units {
  id: string;
  text: string;
}

@Component({
  selector: 'app-editpopmodel',
  templateUrl: './editpopmodel.component.html',
  styleUrls: ['./editpopmodel.component.scss']
})
export class EditpopmodelComponent implements OnInit {

  popFormEdit: FormGroup;
  userId : number;
  productId : number;
  paramss: any;
  response: any;
  brands: any;
  categories: any;
 

  units: Units[] = [
    {id: '1', text: '1'}, {id: '5', text: '5'}, {id: '10', text: '10'}, {id: '15', text: '15'}
  ];

  dataSource = new MatTableDataSource<Discurinventory>([]);
  constructor(private actroute: ActivatedRoute,
    //private alertService: AlertService,
    private router: Router,
    public dialogRef: MatDialogRef<EditpopmodelComponent>,
    private brandService: BrandService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private distributorInventoryService: DistributorService,
    public toasterService: ToastrService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private fb: FormBuilder) { 
      
      
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
    }

  ngOnInit() {
    //console.log(this.data);
    this.popFormEdit = this.fb.group({
      productName: ['', [Validators.required]],
      skuCode: [''],
      tax: ['',[Validators.required]],
      hsnCode: ['',[Validators.required]],
      brandName: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      sellingPriceToRetailer:['', [Validators.required]],
      additionalDiscount:['', [Validators.required]],
      minOrderQty: ['', [Validators.required]],
      purchasePrice: ['', [Validators.required]],
      subUnits: ['', [Validators.required]],
      selectUnits: ['', [Validators.required]],
      productDescription: ['', [Validators.required, Validators.minLength(1) ]],
      productClearence: [false, [Validators.required]],
      promotionalText: [''],
      productImg: ['', [Validators.required]]
    });

    this.getEditPopupData();
    
  }

  
  
  
  getEditPopupData() {
    
      //console.log(this.productId);
    
    this.paramss = JSON.stringify({'userid': this.data.userid, 'ProductId':this.data.productId});
    //console.log(this.paramss);
    this.getCategoryByBrand('', this.data.ProductInfo.brands_id);
    this.fetchBrandData();
    const formData = new FormData();
    formData.append('cmd', this.paramss);
      return this.distributorInventoryService.getProductById(formData).subscribe(data => {
      //this._id = data.id;
      this.response = data;
      if(this.response.status===1) {
      this.popFormEdit.setValue({
        productName: this.response.records.ProName,
        skuCode: this.response.records.sku_code,
        tax: this.response.records.tax,
        hsnCode: this.response.records.hsn_code,
        brandName: this.response.records.brands_id, 
        categoryName: this.response.records.category_id,
        sellingPriceToRetailer:this.response.records.selling_price_to_retailer,
        additionalDiscount: this.response.records.additional_discount,
        minOrderQty: this.response.records.CurrentInventory, 
        purchasePrice: this.response.records.PurchasePrice, 
        selectUnits: this.response.records.unit, 
        subUnits: this.response.records.sub_unit, 
        productDescription: this.response.records.product_desc, 
        promotionalText: this.response.records.promotional_text,
        productClearence: ((this.response.records.clearance_stock===null) || (this.response.records.clearance_stock==='0'))?false:true, 
        productImg: '', 
      });

    } else {
      this.toasterService.error('No Record Found!', 'Manage products!');
    } 
  },
    error => {
    this.toasterService.error('No Record Found!', 'Manage products!');

        });
}



  
      
 
  getCategoryByBrand(id, Productid) {
     
    let brandId: number = id.value;
    if(Productid !== '') {
      brandId = Productid;
    }
 
    console.log(Productid);
    return this.categoryService.getCategoryByBrandsById(brandId).subscribe(
        (data) => {
         this.response = data;

            if (this.response.msg === 1) {
              this.categories = this.response.categories;
              console.log(this.categories);
             // this.toasterService.success('Category Not Available!', this.response.categories);
            } else {
              this.toasterService.error('Category!', 'Category Not Available!');
            }
        }
      );


   // alert('sss' + id.value);

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.popFormEdit.get('productImg').setValue(file);
    }
  }

    fetchBrandData() {
      return this.brandService.fetchBrands()
        .subscribe(
        (data) => {
          this.brands = data ;
          console.log(this.brands);
        },
        error => {

        });
    }


    onSubmit() { 

      const productId = ((document.getElementById('productId') as HTMLInputElement).value);
      
      
      const userId = ((document.getElementById('userId') as HTMLInputElement).value);
     // const userId = this.actroute.snapshot.params['userid'];
   
     
      const formData = new FormData();
      formData.append('productImg', this.popFormEdit.get('productImg').value);
      if(this.popFormEdit.get('productName').value) {
        formData.append('productName', this.popFormEdit.get('productName').value);
      }
      
      formData.append('brandName', this.popFormEdit.get('brandName').value);
      formData.append('sellingPriceToRetailer', this.popFormEdit.get('sellingPriceToRetailer').value);
      formData.append('additionalDiscount', this.popFormEdit.get('additionalDiscount').value);
      formData.append('skuCode', this.popFormEdit.get('skuCode').value);
      formData.append('categoryName', this.popFormEdit.get('categoryName').value);
      formData.append('minOrderQty', this.popFormEdit.get('minOrderQty').value);
      formData.append('purchasePrice', this.popFormEdit.get('purchasePrice').value);
      formData.append('subUnits', this.popFormEdit.get('subUnits').value);
      formData.append('Units', this.popFormEdit.get('selectUnits').value);
      formData.append('productDescription', this.popFormEdit.get('productDescription').value);
      formData.append('productClearence', this.popFormEdit.get('productClearence').value);
      formData.append('userId', userId);
      formData.append('productId', productId);
     
    return this.distributorInventoryService.createInventory(formData).subscribe(
      (data) => { 
            this.response = data;
            if (this.response.status === 1) {
             // this.categories = this.response.msg;
               this.toasterService.success(this.response.msg, 'Manage products!');
              // this.dialogRef.close({data:1});
                this.onNoClick(this.userId);
               
            } else if (this.response.status === 2) {
                this.toasterService.success(this.response.msg, 'Manage products!');
                this.onNoClick(this.userId);
                //this.refresh();
             } else {
                this.toasterService.error(this.response.msg, 'Manage products!');
            }
        });
    }
  
  
    onNoClick(u_id:any): void {
      //let dialogRef = this.dialog.open(MyDialogComponent);
  

      this.dialogRef.close();
      //alert('popupClose'+u_id);
  
      //this.router.navigate(['/webview/manageinventory/13']);
      setTimeout(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
        }, 1000);
      /*this.dialogRef.afterClosed().subscribe(result => {
        
       
      });*/
    }

    close() {
      this.dialogRef.close();
     return false;
 }

}  
