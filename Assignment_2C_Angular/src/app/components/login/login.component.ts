import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Login</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="form-group mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    [ngClass]="{ 'is-invalid': submitted && f['email'].errors }"
                  />
                  <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
                    <div *ngIf="f['email'].errors['required']">Email is required</div>
                    <div *ngIf="f['email'].errors['email']">Email must be valid</div>
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="password">Password</label>
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    [ngClass]="{ 'is-invalid': submitted && f['password'].errors }"
                  />
                  <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
                    <div *ngIf="f['password'].errors['required']">Password is required</div>
                  </div>
                  <div class="form-check mt-2">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="showPassword"
                      (change)="toggleShowPassword()"
                    />
                    <label class="form-check-label" for="showPassword">Show Password</label>
                  </div>
                </div>

                <div class="form-group text-center">
                  <button class="btn btn-primary" type="submit">Login</button>
                </div>

                <div *ngIf="error" class="alert alert-danger mt-3">
                  {{ error }}
                </div>

                <div class="text-center mt-3">
                  <p>Don't have an account? <a routerLink="/register">Register here</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { 
      width: 100%; 
      padding: 40px; 
      text-align: center; 
      min-height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
    }
    .card { 
      box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
      border-radius: 8px; 
      overflow: hidden; 
      width: 100%; 
      max-width: 600px; 
    }
    .card-header { 
      background-color: #f8f9fa; 
      padding: 20px; 
      border-bottom: 1px solid #ddd; 
    }
    .btn-primary { 
      width: 100%; 
      transition: background-color 0.3s ease; 
      margin-top: 20px; 
    }
    .btn-primary:hover { 
      background-color: #0056b3; 
    }
    .form-control { 
      border-radius: 4px; 
      margin: 10px 0; 
    }
    .invalid-feedback { 
      color: #dc3545; 
      font-size: 0.9em; 
    }
    .form-group { 
      margin-bottom: 20px; 
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  showPassword = false; // Add this line

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleShowPassword() { // Add this method
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    const success = this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}