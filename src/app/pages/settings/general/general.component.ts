import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>General Settings</h1>
      <p>General settings coming soon...</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
    }
  `]
})
export class GeneralComponent {} 