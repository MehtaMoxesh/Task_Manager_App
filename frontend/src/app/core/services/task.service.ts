import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = inject(ApiService);
  private readonly baseUrl = '/api/tasks';

  getTasks(): Observable<ApiResponse<Task[]>> {
    return this.api.get<ApiResponse<Task[]>>(this.baseUrl);
  }

  getTask(id: number): Observable<ApiResponse<Task>> {
    return this.api.get<ApiResponse<Task>>(`${this.baseUrl}/${id}`);
  }

  createTask(task: Task): Observable<ApiResponse<Task>> {
    return this.api.post<ApiResponse<Task>>(this.baseUrl, task);
  }

  updateTask(id: number, task: Task): Observable<ApiResponse<Task>> {
    return this.api.put<ApiResponse<Task>>(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<ApiResponse<void>> {
    return this.api.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
