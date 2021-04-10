import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
   declarations: [
      AppComponent,
      ProductComponent,
      NavBarComponent,
      AddProductComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
   HttpClientModule,
   FormsModule,
   ReactiveFormsModule,
   NgbModule
	],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
