import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content">
        <div class="container">
          <div class="page-header">
            <div class="header-left">
              <button mat-icon-button class="back-button" routerLink="/profile">
                <mat-icon>arrow_back</mat-icon>
              </button>
              <div class="header-content">
                <h1>Subscription Management</h1>
                <p class="subtitle">Manage your PharmaLink subscription and billing</p>
              </div>
            </div>
          </div>

          <div class="subscription-content">
            <mat-card class="current-plan">
              <div class="plan-header">
                <div>
                  <h2>Current Plan</h2>
                  <p class="plan-name">Free Trial</p>
                </div>
                <span class="status-badge active">Active</span>
              </div>
              <div class="plan-details">
                <p class="expiry">Trial expires in Infinity days</p>
                <ul class="features">
                  <li>
                    <mat-icon>check_circle</mat-icon>
                    <span>Unlimited orders per month</span>
                  </li>
                  <li>
                    <mat-icon>check_circle</mat-icon>
                    <span>WhatsApp Notifications</span>
                  </li>
                  <li>
                    <mat-icon>check_circle</mat-icon>
                    <span>Support through Emails</span>
                  </li>
                </ul>
              </div>
            </mat-card>

            <div class="coming-soon-section mat-mdc-card">
              <mat-icon class="coming-soon-icon">rocket_launch</mat-icon>
              <h2>New Plans Coming Soon!</h2>
              <p>We're working on exciting new subscription plans to better serve your needs.</p>
              <p class="stay-tuned">Stay tuned for updates!</p>
            </div>
          </div>
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
      
      min-height: calc(100vh - 64px);
      background-color: #f8f9fa;
    }

    .content {
      flex: 1;
      box-sizing: border-box;
      max-width: calc(100vw - 254px);
      overflow-x: hidden;
    }

    .container {
      max-width: 100%;
      padding-left: 10px;
      width: 100%;
    }

    .page-header {
      margin-bottom: 32px;

      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;

        .back-button {
          color: rgba(0, 0, 0, 0.54);
        }

        .header-content {
          h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
            color: #2C3E50;
          }

          .subtitle {
            margin: 4px 0 0;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }

    .current-plan {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 32px;

      .plan-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 24px;

        h2 {
          margin: 0 0 8px;
          font-size: 18px;
          color: #2C3E50;
        }

        .plan-name {
          margin: 0;
          font-size: 24px;
          font-weight: 500;
          color: #0B6E4F;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;

          &.active {
            background-color: #DEF7EC;
            color: #03543F;
          }
        }
      }

      .plan-details {
        .expiry {
          margin: 0 0 16px;
          color: #92400E;
          font-size: 14px;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            color: #4B5563;

            mat-icon {
              color: #0B6E4F;
              font-size: 20px;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }

    .coming-soon-section {
text-align: center;
    padding: 48px 0;
    background: white;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 32px;

      .coming-soon-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #0B6E4F;
        margin-bottom: 24px;
      }

      h2 {
        font-size: 28px;
        color: #2C3E50;
        margin: 0 0 16px;
      }

      p {
        font-size: 16px;
        color: #4B5563;
        margin: 0 0 8px;
        line-height: 1.5;
      }

      .stay-tuned {
        font-weight: 500;
        color: #0B6E4F;
        margin-top: 16px;
      }
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        width: 100%;
        padding: 16px;
      }

      .container {
        padding-left: 0;
      }

      .current-plan {
        margin-bottom: 24px;
      }
    }
  `]
})
export class SubscriptionComponent {} 