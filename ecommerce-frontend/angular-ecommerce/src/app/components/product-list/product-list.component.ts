import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  previousKeyword: string = ""

  currentCategoryName: string = "";
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElement: number = 0;

  totalCost: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ){
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts()
    }
    )
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;  
    this.pageSize = event.pageSize;
    this.listProducts(); 
  }

  listProducts(){
    this.searchMode= this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
        this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
}

handleSearchProducts(){
  const keyword =this.route.snapshot.paramMap.get('keyword')!;

  if(this.previousKeyword != keyword){
      this.pageNumber = 1;
  }

  this.previousKeyword = keyword;

  this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword).subscribe(
    data =>{
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElement = data.page.totalElements;
})
}

handleListProducts(){
  const hasCategoryId: boolean= this.route.snapshot.paramMap.has('id');

  if(hasCategoryId){
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
  
  }else{
    this.currentCategoryId = 1;
    this.currentCategoryName = 'Books';
  }

  if(this.previousCategoryId != this.currentCategoryId){
    this.pageNumber = 1;
  }

  this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElement = data.page.totalElements;
      }
    );
}

addToCart(product: Product){
  const cartItem = new CartItem(product);
console.log(cartItem)
  this.cartService.addToCart(cartItem);
}

}
