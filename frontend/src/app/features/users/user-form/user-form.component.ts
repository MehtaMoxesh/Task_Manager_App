import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<UserFormComponent>);
  private notificationService = inject(NotificationService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: User | null) {
    this.isEditMode = !!data;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      password: [
        '', 
        this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]
      ],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;
    
    // In edit mode, if password is empty, don't send it
    if (this.isEditMode && !userData.password) {
      delete userData.password;
    }

    const request$ = this.isEditMode 
      ? this.userService.updateUser(this.data!.id!, userData)
      : this.userService.createUser(userData);

    request$.subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message);
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        // Handled by Interceptor
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
