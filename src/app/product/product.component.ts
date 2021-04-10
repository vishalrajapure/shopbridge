import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../shared/Product';
import { empty, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Product[] = [];
  public modalProduct: Product;
  private subscriptions$: Subscription[] = [];
  closeResult = '';

  constructor(private productService: ProductService, private modalService: NgbModal) { }

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
            return;
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

  public modifyProduct(product) {
    const modifiedProdSub$ = this.productService.modifyProduct(product).subscribe(
      (response) => {
        this.displayProducts();
      },
      (err) => {
        console.log('Error occured while deleting product from server')
        return;
      });
    this.subscriptions$.push(modifiedProdSub$);
    Swal.fire(
      'Modified!',
      'Product has been modified successfully.',
      'success'
    )
  }

  public openProductModifyModal(modifyproduct, product) {
    this.modalProduct = product;
    this.modalService.open(modifyproduct, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg', scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modifyProduct(this.modalProduct);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
