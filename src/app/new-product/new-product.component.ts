import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  
  public productFrom! : FormGroup;


  constructor(private fb: FormBuilder, private productService : ProductService){}

  ngOnInit(){
    this.productFrom=this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control('0'),
      checked: this.fb.control(false),
    })
  }

  public saveProduct(){
      let product : Product = this.productFrom.value;
      this.productService.saveProduct(product).subscribe({
        next : data => {
            alert(JSON.stringify(data))
        },
        error : err => {
            console.log(err)
        }
      })
  }
}
