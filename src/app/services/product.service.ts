import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProducts(page: number=1, size:number=4):Observable<Array<Product>>{
    return  this.http.get<Array<any>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }

  public checkProduct(product: Product):Observable<Array<Product>>{
    return  this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
    {checked:!product.checked})
  }

  public handleDelete(product: Product){
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`) 
  }

  public saveProduct(product : Product): Observable<Product>{
      return this.http.post<Product>(`http://localhost:8089/products`, product)
  }

  public searchProducts(keyword: string):Observable<Array<Product>>{
    return  this.http.get<Array<any>>(`http://localhost:8089/products?name_like=${keyword}`);
  } 
}
