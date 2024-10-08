import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategoryComponent } from '../common/product-category/product-category.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) { }


  getProductList(categoryId: number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
    }

    getProductCategories(): Observable<ProductCategoryComponent[]>{
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
      )
    }

    searchProducts(keyword: string): Observable<Product[]>{
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products)
      );
    }
     
    getProduct(productId: number): Observable<Product>{
      const productUrl = `${this.baseUrl}/${productId}`;
      return this.httpClient.get<Product>(productUrl);
    }

    getProductListPaginate(page: number, size: number, categoryId: number): Observable<GetResponseProducts>{
      const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;
      return this.httpClient.get<GetResponseProducts>(url);
    }

    searchProductsPaginate(page: number, size: number, keyword: string): Observable<GetResponseProducts>{
      const url = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${size}`;
      return this.httpClient.get<GetResponseProducts>(url);
    }
    
  }



interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
    _embedded:{
      productCategory: ProductCategoryComponent[];
    }
}
