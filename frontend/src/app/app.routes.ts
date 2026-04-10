import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'users', loadChildren: () => import('./features/users/users.routes').then(m => m.USER_ROUTES) },
  { path: '**', redirectTo: '' }
];
