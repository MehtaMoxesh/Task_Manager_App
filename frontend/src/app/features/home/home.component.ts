import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="home-container">
      <mat-card class="welcome-card mat-elevation-z4">
        <mat-card-header>
          <div mat-card-avatar class="header-image"></div>
          <mat-card-title>Welcome to Task Manager</mat-card-title>
          <mat-card-subtitle>Angular 17 + Spring Boot</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>
            Manage your users efficiently. Get started by viewing and managing the users list!
          </p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-raised-button color="primary" routerLink="/users">Manage Users</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }
    .welcome-card {
      max-width: 600px;
      width: 100%;
    }
    .header-image {
      background-image: url('https://angular.io/assets/images/logos/angular/angular.svg');
      background-size: cover;
    }
    mat-card-content {
      margin: 1.5rem 0;
      font-size: 1.1rem;
    }
  `]
})
export class HomeComponent {}
