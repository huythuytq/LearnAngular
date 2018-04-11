import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiClientService {

  constructor(
    private http: Http,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.sessionService.getToken()) {
      headersConfig['Authorization'] = `${this.sessionService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private setHeadersFile(): Headers {
    const headersConfig = {
      'Accept': 'application/json',
    };

    if (this.sessionService.getToken()) {
      headersConfig['Authorization'] = `${this.sessionService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private setHeadersFileExcel(): Headers {
    const headersConfig = {
      'Accept': 'application/vnd.ms-excel.sheet.macroEnabled.12',
      // 'Content-Type': 'application/json',
    };

    if (this.sessionService.getToken()) {
      headersConfig['Authorization'] = `${this.sessionService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    switch (error.status) {
      case 401:
        this.sessionService.destroySession();
        this.router.navigate(['/login']);
        break;
      case 500:
        // this.alertService.error('Đã có lỗi xảy ra ! Vui lòng thử lại sau.');
        break;
      default:
    }
    return Observable.throw(error);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_endpoint}${path}`, { headers: this.setHeaders(), search: params })
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }

  getFile(path: string): Observable<any> {
    return this.http.get(`${environment.api_endpoint}${path}`,
      { headers: this.setHeadersFileExcel(), responseType: ResponseContentType.Blob })
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.blob());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }

  postFile(path: string, formData: FormData): Observable<any> {
    return this.http.post(
      `${environment.api_endpoint}${path}`,
      formData
      ,
      { headers: this.setHeadersFile() }
    )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }


  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_endpoint}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }

  postNoHeader(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_endpoint}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => res.json());
  }

}
