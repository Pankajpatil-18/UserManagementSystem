import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports:[RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  onReq(){
    this.router.navigate(['/request-management']);
  }
  onUse(){
    this.router.navigate(['/user-management']);
  }
  onTab(){
    this.router.navigate(['/tableAd']);
  }
}
