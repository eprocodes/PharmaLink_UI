import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isCollapsed = new BehaviorSubject<boolean>(true);
  isCollapsed$ = this.isCollapsed.asObservable();

  constructor() {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.isCollapsed.next(JSON.parse(savedState));
    }
  }

  toggleSidebar() {
    const newState = !this.isCollapsed.value;
    this.isCollapsed.next(newState);
    // Save state to localStorage
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  }

  setCollapsed(collapsed: boolean) {
    this.isCollapsed.next(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }
} 