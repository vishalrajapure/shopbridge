import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../shared/Product';
import { empty, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Product[] = [];
  public modalProduct: Product;
  private subscriptions$: Subscription[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.displayProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions$.map(sub => sub && sub.unsubscribe());
  }

  public displayProducts() {
    const fetchProductsSub$ = this.productService.displayProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (err) => {
        console.log('Error occured while fetching products from server')
        this.products = [];
      });
    this.subscriptions$.push(fetchProductsSub$);
  }

  public deleteProduct(product) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this product again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteProductSub$ = this.productService.deleteProduct(product.id).subscribe(
          (response) => {
            this.displayProducts();
          },
          (err) => {
            console.log('Error occured while deleting product from server')
          });
        this.subscriptions$.push(deleteProductSub$);
        Swal.fire(
          'Deleted!',
          'Product has been deleted.',
          'success'
        )
      }
    })
  }

  public modifyProduct(product){

  }

  openProductModifyModal(modifyproduct, product) {
    // this.modalProduct = product;
    // this.modalService.open(modifyproduct, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg', scrollable: true }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

}
