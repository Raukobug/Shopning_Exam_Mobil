import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccessLevel } from '../models/accessLevels';
import { Products } from '../models/products';
import { Shops } from '../models/shops';
import { Items } from '../models/items';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

@Injectable()
export class Rest {

  private apiUrl;

  constructor(public http: Http) {
   
  }
  GetAccessLevels(): Observable<Array<AccessLevel>> {
    this.apiUrl = 'api/accessLevels';
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  GetProducts(): Observable<Array<Products>> {
    this.apiUrl = 'api/products';
    return this.http.get(this.apiUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  GetShops(): Observable<Array<Shops>> {
    this.apiUrl = 'api/shops';
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
