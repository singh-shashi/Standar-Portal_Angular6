import { HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpErrorInterceptor  implements HttpInterceptor {
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
return next.handle(request)
        .pipe(
          catchError( (error: HttpErrorResponse) => {
             let errMsg = '';
             // Client Side Error
             if (error.error instanceof ErrorEvent) {
               errMsg = `Error: ${error.error.message}`;
             } else {  // Server Side Error

              if (error.status === 401 || error.status === 404 || error.error.ExceptionMessage.toUpperCase()=== 'SESSION IS EXPIRED.') {
               sessionStorage.removeItem('isLoggedIn');
               sessionStorage.removeItem('sessionFooterMsg');
               sessionStorage.removeItem('Sessionsocialmedia');
               window.location.href = window.location.origin + window.location.pathname + '#' + '/auth/login';
              // return false;
              }
               // errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
             }
             // return an observable
            return throwError(error.error.ExceptionMessage);
           })
        )
}
}
