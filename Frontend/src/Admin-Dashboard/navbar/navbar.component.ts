import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports:[RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router,private authService: AuthService) {}
  onReq(){
    this.router.navigate(['/request-management']);
  }
  onUse(){
    this.router.navigate(['/user-management']);
  }
  onTab(){
    this.router.navigate(['/tableAd']);
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    // console.log('User logged out');
  }
  
}
