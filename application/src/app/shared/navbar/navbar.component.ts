import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
