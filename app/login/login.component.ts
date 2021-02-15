import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService} from '../shared/services/auth-service.service';
// import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
// @Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    returnUrl: string;
    userName = '';
    password = '';
    errorMessage = '';
    invalidLogin = false;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthServiceService
        ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }



    get formControls() { return this.loginForm.controls; }
    
    onLogin() {
         // console.log(this.loginForm.value);

         // this.userName =this.formControls.email.value;
         // this.password =this.formControls.password.value;
         const resource = this.loginForm.value;
         this.authService.isLoggedIn(resource).subscribe(
            res => {
                if (res.status) {
                    localStorage.setItem('isLoggedin', res.status);
                    this.router.navigate(['/dashboard']);
                    sessionStorage.setItem('id', res.id);
                    // retrieving from the session //
                    const data = sessionStorage.getItem('id');
                    // console.log(data) //to see the id in the console
                    // console.log(res);
                } else {
                this.errorMessage = 'UserName & Password Mismatch';
                this.invalidLogin = true;
                }



            },
            error => {
                this.errorMessage = 'UserName & Password Mismatch';
                this.invalidLogin = true;
          });
         /*console.log(this.userName+" "+this.password);
         if(this.userName=='test@gmail.com' && this.password=='admin'){
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard']);
        }
        else{
             //alert('UserName & Password Mismatch');
             this.errorMessage = 'UserName & Password Mismatch';
             this.invalidLogin = true;
        }*/

    }
}
