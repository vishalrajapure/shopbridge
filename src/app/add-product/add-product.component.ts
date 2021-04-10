import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { Product } from '../shared/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private product: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  addProductForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    price: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]),
    description: new FormControl([''], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

  addProduct(): void {
    this.productService.addProduct(this.addProductForm.value).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Product added successfully',
        })
      },
      (err) => {
        console.log('Error occured while adding new product to inventory')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    );
  }
}
