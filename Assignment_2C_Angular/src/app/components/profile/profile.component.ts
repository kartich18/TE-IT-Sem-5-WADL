import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Profile</h3>
            </div>
            <div class="card-body" *ngIf="currentUser">
              <div class="text-center mb-4">
                <div class="avatar-placeholder mb-3">
                  <i class="fas fa-user"></i>
                </div>
                <h4>{{ currentUser.username }}</h4>
              </div>

              <div class="user-info">
                <div class="info-item">
                  <strong>Email:</strong>
                  <span>{{ currentUser.email }}</span>
                </div>
                <div class="info-item">
                  <strong>User ID:</strong>
                  <span>{{ currentUser.id }}</span>
                </div>
              </div>

              <div class="text-center mt-4">
                <button class="btn btn-danger" (click)="logout()">
                  Logout
                </button>
              </div>
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
      max-width: 1000px;
    }
    .card-header { 
      background-color: #f8f9fa; 
      padding: 20px; 
      border-bottom: 1px solid #ddd; 
    }
    .avatar-placeholder { 
      width: 100px; 
      height: 100px; 
      background-color: #e9ecef; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      margin: 0 auto; 
      transition: background-color 0.3s ease; 
      margin-bottom: 20px; 
    }
    .avatar-placeholder:hover { 
      background-color: #d6d8db; 
    }
    .info-item { 
      padding: 15px; 
      border-bottom: 1px solid #eee; 
      display: flex; 
      justify-content: space-between; 
      margin: 10px 0; 
    }
    .info-item:last-child { 
      border-bottom: none; 
    }
    .btn-danger { 
      transition: background-color 0.3s ease; 
      margin-top: 20px; 
    }
    .btn-danger:hover { 
      background-color: #c82333; 
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}