import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiOptionalHeadersModel } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private store: Store, private http: HttpClient) {}

  public httpHeaderOptions(optionalHeaders: ApiOptionalHeadersModel) {
    return new HttpHeaders({
      ...optionalHeaders,
    });
  }

  public request(req: HttpRequest<any>) {
    return this.http.request(req).pipe(catchError(this.handleError(req.method, req.url)));
  }

  private handleError(method = 'method', url = 'url') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.log('status: ', error.status, ' method: ', method);

      // Let the app keep running by returning a safe result.
      return throwError(() => error);
    };
  }
}
