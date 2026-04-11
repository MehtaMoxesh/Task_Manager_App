import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../../../core/services/task.service';
import { Task, TaskPriority, TaskStatus } from '../../../core/models/task.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private notificationService = inject(NotificationService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task | null) {
    this.isEditMode = !!data;
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required]],
      description: [this.data?.description || ''],
      priority: [this.data?.priority || TaskPriority.MEDIUM, [Validators.required]],
      status: [this.data?.status || TaskStatus.TODO, [Validators.required]],
      dueDate: [this.data?.dueDate ? new Date(this.data.dueDate) : null]
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const taskData = { ...this.taskForm.value };
    
    // Convert date to ISO string if exists
    if (taskData.dueDate) {
      taskData.dueDate = taskData.dueDate.toISOString();
    }

    const request$ = this.isEditMode 
      ? this.taskService.updateTask(this.data!.id!, taskData)
      : this.taskService.createTask(taskData);

    request$.subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message);
          this.dialogRef.close(true);
        }
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
