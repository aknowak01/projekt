import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {signInForm} from './signin.models';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  signInForm: FormGroup<signInForm> = this.fb.group({
    login: [''],
    password: [''],
  });
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.authService
      .signIn(this.signInForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/');
        }
      });
  }
}
