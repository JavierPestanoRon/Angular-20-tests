import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { ErrorResponseInterceptor } from "./error-response.interceptor";
import { of, throwError } from "rxjs";

describe('ErrorResponseInterceptor', () => {
  let req: HttpRequest<unknown>;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    req = new HttpRequest('GET', '/test');
    next = jasmine.createSpyObj('HttpHandler', ['handle']);
    spyOn(console, 'log');
  });

  it('should catch HttpErrorResponse and return formatted error', (done) => {
    const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: '/test', error: 'Not found' });
    next.handle.and.returnValue(throwError(() => error));

    ErrorResponseInterceptor(req, next.handle).subscribe({
      error: (err) => {
        expect(err).toBe(`Error status: 404, message: Http failure response for /test: 404 Not Found`);
        expect(console.log).toHaveBeenCalledWith('ErrorResponseInterceptor:', error);
        done();
      }
    });
  });

  it('should pass through successful responses', (done) => {
    const response = { body: 'ok' } as HttpEvent<unknown>;
    next.handle.and.returnValue(of(response));

    ErrorResponseInterceptor(req, next.handle).subscribe({
      next: (res) => {
        expect(res).toBe(response);
        done();
      },
      error: () => {
        fail('Should not error');
        done();
      }
    });
  });
});