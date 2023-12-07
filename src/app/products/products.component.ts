import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
 
  products : Array<Product>=[];
  public keyword : string="";
  totalPages: number=0;
  pageSize: number=3;
  currentPage: number=1;

  constructor(private productService: ProductService, private router: Router){
  }
  ngOnInit(): void {
    

    this.searchProduct();
  }

  public searchProduct(){
    this.productService.searchProduct(this.keyword, this.currentPage,this.pageSize)
        .subscribe({
          next : (resp) => {
            this.products=resp.body as Product[];
            let totalProducts:number= parseInt(resp.headers.get('x-total-count')!)
            this.totalPages= Math.floor(totalProducts/this.pageSize);
            if(totalProducts%this.pageSize!=0){
              this.totalPages=this.totalPages+1;
            }
          },
          error : err => {console.log(err);}
        })
   //this.products$ = this.productService.getProducts();
  }
 

  handleCheckProduct(product: Product){
    this.productService.checkProduct(product).subscribe({
        next : updatedProduct => {
            product.checked=!product.checked
          }
      })
  }

  public handleDelete(product: Product){
    if(confirm("Etes vous sûre ? "))
      this.productService.handleDelete(product).subscribe({
        next : value => {
          //this.getProducts()
          this.products = this.products.filter(p => p.id != product.id);
        }
      })
  }

  // public searchProducts(){
  //   this.currentPage=1;
  //   this.totalPages=0;
  //   this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
  //     next : data => {
  //       this.products=data;
  //     }
  //   })
  // }

  public handleGoToPage(page: number){
    this.currentPage=page;
    this.searchProduct()
  }

  public handleEdit(product: Product){
      this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
