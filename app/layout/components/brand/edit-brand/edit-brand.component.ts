import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';  // ActivatedRoue is used to get
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Brand } from '../../../../shared/services/brand';
import { BrandService } from '../../../../shared/services/brand.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  brandForm: FormGroup;
  _id: number;
  brand_name: string = '';
  error: string;

  isLoadingResults = false; // not use now

  constructor(
    private router: Router,
    private brandService: BrandService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // alert(this.actRoute.snapshot.params['brand-id']);
    this._id = this.actRoute.snapshot.params['brand-id'];
    this.getBrand(this.actRoute.snapshot.params['brand-id']);
    this.brandForm = this.formBuilder.group({
      'brandName' : [null, Validators.required]

    });

    // this.getProduct(this.route.snapshot.params['id']);
  }

// get Brand
  getBrand(id) {
    this.brandService.getBrandsById(id).subscribe(data => {
      this._id = data.id;
      this.brandForm.setValue({
        brandName: data.brand_name

      });
    });
  }

  // update Brand
  saveBrand() {

    // this.isLoadingResults = true;
    this._id = this.actRoute.snapshot.params['brand-id'];
    this.alertService.clear();

    const formData = this.brandForm.value;
    formData.brand_id = this._id; // customObj.employeeId = 12;
    // console.log(formData);
    // console.log(this._id);
    this.brandService.updateBrand(this._id, formData)
      .subscribe(res => {
          // let id = res['_id'];
          // this.isLoadingResults = false;
          this.alertService.success(res.msg, true);
          // console.log(res);
          this.router.navigate(['/brands']);
        }, (error) => {
          this.alertService.error(error);
         // this.isLoadingResults = false;
        }
      );
  }

}
