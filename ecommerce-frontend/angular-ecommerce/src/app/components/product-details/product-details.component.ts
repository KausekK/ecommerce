import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product!: Product
  
  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
  private cartService: CartService){

  }
  ngOnInit(): void {
this.route.paramMap.subscribe(() =>{
this.getProductDetails();
    })
  }

  getProductDetails(){
  const productId: number = + this.route.snapshot.paramMap.get('id')!;

  this.productService.getProduct(productId).subscribe(
    data => {
      this.product = data;
    }
  )
  }

  addToCart(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }
}
