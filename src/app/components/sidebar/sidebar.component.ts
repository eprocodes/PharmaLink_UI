import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  template: `
    <aside class="sidebar">
      <nav class="nav-menu">
        <div class="nav-group">
          <div class="nav-group-title">MAIN MENU</div>
          <a routerLink="/customers" routerLinkActive="active" class="nav-item">
            <i class="fas fa-users"></i>
            <span>Our Customers</span>
          </a>
          <a routerLink="/home" routerLinkActive="active" class="nav-item">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
        </div>

        <div class="nav-group">
          <div class="nav-group-title">ORDERS</div>
          <a routerLink="/orders/new" routerLinkActive="active" class="nav-item">
            <i class="fas fa-file-medical"></i>
            <span>New Order</span>
          </a>
          <a routerLink="/orders/list" routerLinkActive="active" class="nav-item">
            <i class="fas fa-clipboard-list"></i>
            <span>Order List</span>
          </a>
        </div>

        <div class="nav-group">
          <div class="nav-group-title">INVENTORY</div>
          <a routerLink="/medicines/new" routerLinkActive="active" class="nav-item">
            <i class="fas fa-pills"></i>
            <span>Add Medicine</span>
          </a>
          <a routerLink="/medicines/list" routerLinkActive="active" class="nav-item">
            <i class="fas fa-list"></i>
            <span>Medicine List</span>
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      background: white;
      height: 100vh;
      position: fixed;
      top: 64px;
      left: 0;
      padding: 24px 0;
      border-right: 1px solid #e5e7eb;
      overflow-y: auto;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .nav-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-group-title {
      padding: 0 24px;
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 8px;
      letter-spacing: 0.05em;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      color: #374151;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.2s ease;

      i {
        font-size: 16px;
        width: 20px;
        color: #6b7280;
        transition: all 0.2s ease;
      }

      &:hover {
        background: #f9fafb;
        color: #0B6E4F;

        i {
          color: #0B6E4F;
        }
      }

      &.active {
        background: #ecfdf5;
        color: #0B6E4F;
        font-weight: 500;

        i {
          color: #0B6E4F;
        }
      }
    }
  `]
})
export class SidebarComponent {} 