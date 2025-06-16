import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <div class="profile-header">
            <div class="header-content">
              <div>
                <h1>Profile</h1>
                <p class="subtitle">Manage your account information and settings</p>
              </div>
              <div class="profile-actions">
                <button mat-raised-button color="primary" (click)="onEditProfile()">
                  <mat-icon>edit</mat-icon>
                  Edit Profile
                </button>
                <button mat-stroked-button color="primary" (click)="onChangePassword()">
                  <mat-icon>lock</mat-icon>
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <mat-card class="profile-card">
            <div class="profile-info">
              <div class="profile-avatar">
                <mat-icon>account_circle</mat-icon>
              </div>
              <div class="profile-details">
                <div class="name-section">
                  <h2>John Doe</h2>
                  <p class="mobile">+1 (555) 987-6543 <i class="fab fa-whatsapp whatsapp-icon"></i></p>
                  <p class="email">john.doe&#64;pharmalink.com</p>
                </div>
              </div>
              <div class="subscription-section">
                <span class="subscription-badge">Free Trial</span>
                <a routerLink="/subscription" class="manage-subscription">
                  Manage Subscription
                  <mat-icon>arrow_forward</mat-icon>
                </a>
              </div>
            </div>

            <div class="info-grid">
              <mat-card class="info-card">
                <mat-icon class="info-icon">person</mat-icon>
                <div class="info-content">
                  <label>Full Name</label>
                  <p>John Doe</p>
                </div>
              </mat-card>

              <mat-card class="info-card">
                <mat-icon class="info-icon">email</mat-icon>
                <div class="info-content">
                  <label>Email</label>
                  <p>john.doe&#64;pharmalink.com</p>
                </div>
              </mat-card>

              <mat-card class="info-card">
                <mat-icon class="info-icon">phone</mat-icon>
                <div class="info-content">
                  <label>Phone</label>
                  <p>+1 (555) 123-4567</p>
                </div>
              </mat-card>

              <mat-card class="info-card">
                <mat-icon class="info-icon">phone_android</mat-icon>
                <div class="info-content">
                  <label>Business Mobile (WhatsApp)</label>
                  <div class="info-value-with-icon">
                    <p>+1 (555) 987-6543</p>
                    <i class="fab fa-whatsapp whatsapp-icon"></i>
                  </div>
                </div>
              </mat-card>

              <mat-card class="info-card">
                <mat-icon class="info-icon">location_on</mat-icon>
                <div class="info-content">
                  <label>Location</label>
                  <p>Main Branch</p>
                </div>
              </mat-card>

              <mat-card class="info-card">
                <mat-icon class="info-icon">calendar_today</mat-icon>
                <div class="info-content">
                  <label>Join Date</label>
                  <p>Jan 15, 2024</p>
                </div>
              </mat-card>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow-x: hidden;
    }

    .main-content {
      display: flex;
      
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
      margin-left: 200px;
      padding: 24px;
      width: calc(100% - 280px);
      box-sizing: border-box;
    }

    .container {
      max-width: 100%;
      padding-left: 60px;
      width: 100%;
    }

    .profile-header {
      margin-bottom: 24px;

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 40px;
      }

      h1 {
        font-size: 24px;
        color: #2C3E50;
        margin: 0 0 8px 0;
        font-weight: 500;
      }

      .subtitle {
        color: #666;
        margin: 0;
        font-size: 14px;
      }
    }

    .profile-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .profile-info {
      display: flex;
      align-items: flex-start;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #eee;
      position: relative;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #0B6E4F;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24px;
      flex-shrink: 0;

      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: white;
      }
    }

    .profile-details {
      flex: 1;
    }

    .name-section {
      h2 {
        font-size: 24px;
        color: #2C3E50;
        margin: 0 0 8px 0;
        font-weight: 500;
      }

      .mobile, .email {
        color: #666;
        margin: 0 0 4px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .whatsapp-icon {
        color: #25D366;
        font-size: 16px;
      }
    }

    .subscription-section {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    .subscription-badge {
      background-color: #FEF3C7;
      color: #92400E;
      padding: 10px 15px;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 500;
    }

    .manage-subscription {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #0B6E4F;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .info-card {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      border-radius: 12px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        border-color: #0B6E4F20;
      }

      .info-icon {
        color: #0B6E4F;
        margin-right: 16px;
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .info-content {
        flex: 1;

        label {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value-with-icon {
          display: flex;
          align-items: center;
          gap: 8px;

          p {
            font-size: 16px;
            color: #2C3E50;
            margin: 0;
            font-weight: 500;
          }

          .whatsapp-icon {
            color: #25D366;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.2s ease;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        p {
          font-size: 16px;
          color: #2C3E50;
          margin: 0;
          font-weight: 500;
        }
      }
    }

    .profile-actions {
      display: flex;
      gap: 12px;
      align-items: center;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 36px;
        padding: 0 16px;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        width: 100%;
        padding: 16px;
      }

      .profile-header {
        .header-content {
          flex-direction: column;
          gap: 16px;
        }

        .profile-actions {
          width: 100%;
          flex-direction: column;

          button {
            width: 100%;
          }
        }
      }

      .profile-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-bottom: 32px;
      }

      .profile-avatar {
        margin: 0 0 16px 0;
      }

      .subscription-section {
        position: relative;
        margin-top: 16px;
        align-items: center;
      }

      .info-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .info-card {
        padding: 16px;
      }
    }
  `]
})
export class ProfileComponent {
  constructor(private router: Router) {}

  onEditProfile() {
    this.router.navigate(['/profile/edit']);
  }

  onChangePassword() {
    this.router.navigate(['/profile/change-password']);
  }
} 