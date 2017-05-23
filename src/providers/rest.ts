import { Http, Response, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Shops } from '../models/shops';
import { Items } from '../models/items';
import { VisitStatistics } from '../models/visitStatistics';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

@Injectable()
export class Rest {

  private apiUrl;

  constructor(public http: Http) {
   
  }
  GetShops(): Observable<Array<Shops>> {
    this.apiUrl = 'api/shops';
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  GetShop(id): Observable<Shops> {
    this.apiUrl = 'api/shops/' + id;
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  GetItems(): Observable<Array<Items>> {
    this.apiUrl = 'api/items';
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  GetVisits(): Observable<Array<VisitStatistics>> {
    this.apiUrl = 'api/visitStatistics';
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  UpdateVisit(data) {
  // myHeaders.append('Content-type', 'application/x-www-form-urlencoded');
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl ='api/visitStatistics/' + data.id, JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
