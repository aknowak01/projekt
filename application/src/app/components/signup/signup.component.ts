import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {signUpForm} from './signup.models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup<signUpForm> = this.fb.group({
    name: [''],
    password: [''],
    email: [''],
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
      .signUp(this.signUpForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.router.navigateByUrl('/');
      });
  }
}
