import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, delay, startWith, tap} from 'rxjs/operators';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      startWith(null),
      delay(0),
      tap(res => {
        setTimeout(() => this.loadingService.setLoading(false), 2000);
      }),
      catchError(err => {
        setTimeout(() => this.loadingService.setLoading(false), 2000);
        throw err;
      })
    );

  }
}
