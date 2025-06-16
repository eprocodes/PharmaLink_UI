import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-delivery-tracker',
  standalone: true,
  imports: [
    CommonModule,
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
        <div class="coming-soon-container">
          <mat-icon class="coming-soon-icon">local_shipping</mat-icon>
          <h1>Delivery Tracking Coming Soon!</h1>
          <p>We're working hard to bring you a comprehensive delivery tracking system.</p>
          <p>This feature will help you manage and track all your deliveries in real-time.</p>
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

    .coming-soon-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: white;
      border-radius: 8px;
      padding: 48px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-top: 5px;

      .coming-soon-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #0B6E4F;
        margin-bottom: 24px;
      }

      h1 {
        font-size: 24px;
        font-weight: 500;
        color: #2C3E50;
        margin: 0 0 16px 0;
      }

      p {
        color: #666;
        font-size: 16px;
        line-height: 1.5;
        margin: 0 0 8px 0;
        max-width: 600px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `]
})
export class DeliveryTrackerComponent {} 