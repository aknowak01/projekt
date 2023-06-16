import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {signInForm} from '../components/signin/signin.models';
import {signUpForm} from '../components/signup/signup.models';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Token} from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3001';

  constructor(private http: HttpClient) {
  }

  signIn(data: any): Observable<Token> {
    return this.http.post<Token>(this.url + '/api/user/auth', data);
  }

  signUp(data: any): Observable<signUpForm> {
    return this.http.post<signUpForm>(this.url + '/api/user/create', data);
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !jwtHelper.isTokenExpired(token);
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
