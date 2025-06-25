import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/sidebar.service';
import { Subject, takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `

    <div class="app-container" [class.sidebar-collapsed]="isCollapsed$ | async">

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      transition: margin-left 0.3s ease;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PharmaLink';
  isCollapsed$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(private sidebarService: SidebarService) {
    this.isCollapsed$ = this.sidebarService.isCollapsed$;
  }

  ngOnInit() {
    // Any additional initialization if needed
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
