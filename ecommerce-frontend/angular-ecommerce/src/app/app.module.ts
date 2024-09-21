import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './common/product-category/product-category.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes =[
  { path: 'category/:id', component: ProductListComponent},
  { path: 'category', component: ProductListComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: '**', redirectTo: '/products', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
    ],
  providers: [
    ProductService, 
    provideHttpClient(withInterceptorsFromDi()) 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
