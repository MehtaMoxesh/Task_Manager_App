import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z4">
      <span class="logo" routerLink="/">Task Manager App</span>
      <span class="spacer"></span>
      
      <button mat-button routerLink="/">Home</button>
      <button mat-button routerLink="/users">Users</button>

      <ng-container *ngIf="authService.currentUser$ | async as user; else guest">
        <button mat-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
          {{ user.name }}
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item disabled>
            <mat-icon>person</mat-icon>
            <span>{{ user.email }}</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </ng-container>

      <ng-template #guest>
        <button mat-raised-button color="accent" routerLink="/login">Login</button>
      </ng-template>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      cursor: pointer;
      font-weight: 500;
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 0 16px;
    }
    button {
      margin-left: 8px;
    }
  `]
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
