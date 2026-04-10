import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.error && error.error.message) {
          // Used our ApiResponse wrapper
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      notificationService.showError(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
