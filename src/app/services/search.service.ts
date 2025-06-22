import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SearchResult {
  type: 'customer' | 'medicine' | 'order' | 'ticket';
  id: number;
  title: string;
  description: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults = new BehaviorSubject<SearchResult[]>([]);
  private isSearching = new BehaviorSubject<boolean>(false);

  constructor() {}

  search(query: string): Observable<SearchResult[]> {
    this.isSearching.next(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This is a mock implementation. Replace with actual API calls
      const results: SearchResult[] = [
        {
          type: 'customer' as const,
          id: 1,
          title: 'John Smith Pharmacy',
          description: 'Customer ID: 1',
          link: '/customers/1'
        },
        {
          type: 'medicine' as const,
          id: 1,
          title: 'Paracetamol 500mg',
          description: 'Medicine ID: 1',
          link: '/medicines/1'
        },
        {
          type: 'order' as const,
          id: 1,
          title: 'Order #12345',
          description: 'Status: Processing',
          link: '/orders/1'
        },
        {
          type: 'ticket' as const,
          id: 1,
          title: 'Support Ticket #789',
          description: 'Status: Open',
          link: '/tickets/1'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      this.searchResults.next(results);
      this.isSearching.next(false);
    }, 300);

    return this.searchResults.asObservable();
  }

  getSearchResults(): Observable<SearchResult[]> {
    return this.searchResults.asObservable();
  }

  getIsSearching(): Observable<boolean> {
    return this.isSearching.asObservable();
  }

  clearSearch() {
    this.searchResults.next([]);
  }
} 