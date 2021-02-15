import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { BrandService } from '../../../../shared/services/brand.service';
import { Brand } from '../../../../shared/services/brand';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm : FormGroup;
  categoryName = '';
  //category : Category[];
  selected = 'option2';
  error: string;
  //brands : Brand[]=[];
  brands : any;
  response: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private brandService:BrandService
  ) {
      // this.brands = this.fetchBrandData();
   }

  ngOnInit() {

      this.categoryForm = this.formBuilder.group({
          categoryName: ['', [Validators.required]],
          brandId: ['',[Validators.required]]
      }); 
    //this.brands = this.fetchBrandData();
      this.fetchBrandData();

  }

  /*ngAfterViewInit(): void {

   //this.fetchBrandData();
   
  }*/
 

  

  saveCategory() {
    
      // reset alerts on submit
      this.alertService.clear();
  
      const resource = this.categoryForm.value;
      console.log(resource);
      
      /*this.categoryService.createBrand(resource).subscribe(
        res => {
          this.alertService.success('category add successful', true);
          this.router.navigate(['/category']); 
            //console.log(res);
        },
        error => {
          this.alertService.error(error);
          //this.loading = false;
      });*/
  }


  fetchBrandData() {
 
    return this.brandService.fetchBrands()
      .subscribe(
       (data) => { 

        this.response = data; 
        if (this.response.status === 1 ) {
          this.brands =  this.response.records;
        }


        // this.brands=data ;
        // console.log(data[0].brand_name);
       },
       error => { 
        this.alertService.error(error);
        //this.loading = false;
      });
      
  }


}
