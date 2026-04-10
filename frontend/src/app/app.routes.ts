import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) 
  },
  { 
    path: 'users', 
    loadComponent: () => import('./features/users/user-list/user-list.component').then(c => c.UserListComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
