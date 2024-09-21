import { Component } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent {

  public id: number = 0; 
  public categoryName: string = '';

  constructor(){}

}
