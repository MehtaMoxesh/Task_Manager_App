import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiService = inject(ApiService);
  private readonly baseUrl = '/api/users'; // Proxied to localhost:8080/api/users

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.apiService.get<ApiResponse<User[]>>(this.baseUrl);
  }

  getUser(id: number): Observable<ApiResponse<User>> {
    return this.apiService.get<ApiResponse<User>>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.apiService.post<ApiResponse<User>>(this.baseUrl, user);
  }

  updateUser(id: number, user: User): Observable<ApiResponse<User>> {
    return this.apiService.put<ApiResponse<User>>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
