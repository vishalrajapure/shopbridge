import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../shared/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  displayProducts(): Observable<any> {
    return this.httpClient.get(environment.SERVER_BASE_PATH + 'products');
  }

  deleteProduct(productid: Number): Observable<void> {
    return this.httpClient.delete<void>(environment.SERVER_BASE_PATH + 'products/' + productid);
  }

  addProduct(product: Product) {
    product.id = Math.floor((Math.random() * 100) + 1);
    return this.httpClient.post(environment.SERVER_BASE_PATH + 'products/', product);
  }

  modifyProduct(modifiedProduct: Product){
    return this.httpClient.put(environment.SERVER_BASE_PATH + 'products/', modifiedProduct);
  }

}
