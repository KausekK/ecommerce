import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  keyWord: string ='';

  constructor(private router: Router){

  }
  ngOnInit(): void {
  }


  searchProducts(value: string){
    this.router.navigateByUrl(`/search/${value}`);
  }
}
