import { Component, OnInit } from '@angular/core';
import { ProductCategoryComponent } from '../../common/product-category/product-category.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategoryComponent []=[];

  constructor(private productService: ProductService){}


  ngOnInit(): void {
    this.listProductCategories()
  }

  listProductCategories(){
    this.productService.getProductCategories()
      .subscribe(data => {
        this.productCategories = data;
        });
    
  }
}
