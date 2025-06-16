import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/sidebar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <app-header></app-header>
    <div class="main-content">
      <app-sidebar></app-sidebar>
      <div class="content" [class.sidebar-collapsed]="isCollapsed">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .main-content {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .content {
      flex: 1;
      transition: margin-left 0.3s ease;
      &.sidebar-collapsed {
        margin-left: 64px;
      }
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        padding: 16px;

        &.sidebar-collapsed {
          margin-left: 0;
        }
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PharmaLink';
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
}
