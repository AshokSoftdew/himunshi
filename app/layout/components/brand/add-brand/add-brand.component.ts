import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BrandService } from '../../../../shared/services/brand.service';
import { AlertService } from '../../../../shared/services/alert.service';
//import { Observable, throwError, from } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Brand } from '../../../../shared/services/brand';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  brandForm : FormGroup;
  brandName ='';
  brands : Brand[];
  error: string;

  constructor( private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private brandService: BrandService, 
    private alertService: AlertService,
    //private ValidatorFn : ValidatorFn,
   // private ab : AbstractControl
     ) { }

  ngOnInit() {
    this.brandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]]
     
  });

  }

  get formControls() { return this.brandForm.controls; }

  saveBrand1() {
    this.brandName = this.formControls.brandName.value;
    
   return this.brandService.firstClick()
   .subscribe(
     (data) => {this.brands=data;
      console.log(data);
     }
     );
    }
  saveBrand() {
    // reset alerts on submit
    this.alertService.clear();

    const resource = this.brandForm.value;
    console.log(resource);
    
    this.brandService.createBrand(resource).subscribe(
      res => {
        this.alertService.success('Brand add successful', true);
        this.router.navigate(['/brands']); 
          //console.log(res);
      },
      error => {
        this.alertService.error(error);
        //this.loading = false;
    });
   
  }
   

   /*brandNameValidate(): ValidatorFn {     
    return (control: AbstractControl): { [key: string]: boolean } | null => {         
      if (control.value !== undefined && (isNaN(control.value) )) {  
        alert(control.value);          
         return { 'ageRange': true };  }        
          return null;     
        }; 
  }*/

  /*function validator(params:any):ValidatorFn {
    return(c : AbstractControl) : {[key : string] :boolean} | null =>{
      return null;
    };
  }*/
}


