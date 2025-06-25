import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarService } from '../../services/sidebar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed">
      <nav class="nav-menu">
        <button class="collapse-btn" (click)="toggleSidebar()" matTooltip="{{ isCollapsed ? 'Open Menu' : 'Close Menu' }}">
          <i class="fas" [class.fa-bars]="isCollapsed" [class.fa-times]="!isCollapsed"></i>
        </button>

        <div class="nav-group">
          <div class="nav-group-title" *ngIf="!isCollapsed">MAIN MENU</div>
          <a routerLink="/home" routerLinkActive="active" class="nav-item" matTooltip="Dashboard">
            <i class="fas fa-chart-line"></i>
            <span *ngIf="!isCollapsed">Dashboard</span>
          </a>
          <a routerLink="/customers" routerLinkActive="active" class="nav-item" matTooltip="Our Customers">
            <i class="fas fa-users"></i>
            <span *ngIf="!isCollapsed">Our Customers</span>
          </a>
        </div>

        <div class="nav-group">
          <div class="nav-group-title" *ngIf="!isCollapsed">ORDERS</div>
          <a routerLink="/orders/list" routerLinkActive="active" class="nav-item" matTooltip="Orders">
            <i class="fas fa-clipboard-list"></i>
            <span *ngIf="!isCollapsed">Orders</span>
          </a>
          <a routerLink="/orders/new" routerLinkActive="active" class="nav-item" matTooltip="New Order">
            <i class="fas fa-file-medical"></i>
            <span *ngIf="!isCollapsed">New Order</span>
          </a>
        </div>

        <div class="nav-group">
          <div class="nav-group-title" *ngIf="!isCollapsed">INVENTORY</div>
          <a routerLink="/medicines/new" routerLinkActive="active" class="nav-item" matTooltip="Add Medicine">
            <i class="fas fa-pills"></i>
            <span *ngIf="!isCollapsed">Add Medicine</span>
          </a>
          <a routerLink="/medicines/list" routerLinkActive="active" class="nav-item" matTooltip="Medicine List">
            <i class="fas fa-list"></i>
            <span *ngIf="!isCollapsed">Medicine List</span>
          </a>
        </div>

        <div class="nav-group">
          <div class="nav-group-title" *ngIf="!isCollapsed">DELIVERY</div>
          <a routerLink="/delivery/tracker" routerLinkActive="active" class="nav-item" matTooltip="Delivery Tracker">
            <i class="fas fa-truck"></i>
            <span *ngIf="!isCollapsed">Delivery Tracker</span>
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 64px;
      left: 0;
      height: calc(100vh - 64px);
      width: 254px;
      background: white;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      z-index: 100;
      overflow: hidden;

      &.collapsed {
        width: 64px;
           .nav-item {
          padding: 12px;
          justify-content: center;

          i {
            margin: 0;
          }
        }
      }
    }

    .collapse-btn {
      position: absolute;
      background:white;
      top: 0px;
      width: 100%;
      height: 45px;
      border:none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 101;
      transition: all 0.2s ease;
      padding: 0;
      i {
        font-size: 20px;
        color:#0b6e4f;
        transition: transform 0.2s ease;
      }
    }
    .collapsed .collapse-btn{
       background: #0b6e4f;
        i {
        font-size: 20px;
        color:white;
        transition: transform 0.2s ease;
      }
    }
     .collapsed .nav-group{
      margin-bottom: 0px;
      }
     .collapsed .nav-item {
     margin-bottom: 10px;
     }
.fas.fa-times{
position: absolute;
    right: 20px;
}
    .nav-menu {
      flex: 1;
      overflow-y: auto;
      padding: 45px 0 16px 0;
      position: relative;
          }

    .nav-group {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .nav-group-title {
      padding: 0 16px;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 500;
      color: #666;
      text-transform: uppercase;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: #2C3E50;
      text-decoration: none;
      transition: all 0.2s ease;
      position: relative;

      i {
        font-size: 16px;
        margin-right: 12px;
        width: 16px;
        text-align: center;
        color: #666;
      }

      span {
        font-size: 14px;
        font-weight: 400;
      }

      &:hover {
        background: #f8f9fa;
        color: #0B6E4F;

        i {
          color: #0B6E4F;
        }
      }

      &.active {
        background: #f0fdf4;
        color: #0B6E4F;
        font-weight: 500;

        i {
          color: #0B6E4F;
        }

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #0B6E4F;
        }
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);

        &.collapsed {
          transform: translateX(0);
          width: 64px;
        }
      }
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  private destroy$ = new Subject<void>();

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.isCollapsed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(collapsed => {
        this.isCollapsed = collapsed;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}