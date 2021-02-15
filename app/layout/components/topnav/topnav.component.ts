import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import * as $ from 'jquery';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    public navbarValue: string;

    constructor(public router: Router, private translate: TranslateService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
 
    toggleNavbar123() {

       this.navbarValue = ((document.getElementById('mininavAshok') as HTMLInputElement).value);
       if(this.navbarValue==='1') {
              (document.querySelector('.main-container') as HTMLElement).style.left = '0px';
              (document.getElementById('sidebar') as HTMLInputElement).style.width = '0px';
              (document.getElementById('mininavAshok') as HTMLInputElement).value = '2';
       } else {
             (document.querySelector('.main-container') as HTMLElement).style.left = '200px';
              (document.getElementById('sidebar') as HTMLInputElement).style.width = '200px';
            (document.getElementById('mininavAshok') as HTMLInputElement).value = '1';
       }

          
          // (document.getElementById('sidebar') as HTMLInputElement).style.width = '0px';
    }
}
