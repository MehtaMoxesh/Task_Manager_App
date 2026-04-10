import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer mat-typography">
      <p>&copy; 2024 Task Manager App. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      text-align: center;
      padding: 1.5rem;
      background: #f5f5f5;
      color: rgba(0,0,0,.54);
      margin-top: auto;
    }
  `]
})
export class FooterComponent { }
