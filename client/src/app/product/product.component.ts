import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DadosComponent } from '../dados/dados.component';
export interface DialogDataProduct {
  id : number,
  description : string,
  price : number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  description : string = '';
  products : Array<any> = []; 
  pesquisar : string = '';
  html : string = '';
  id : number | undefined;
  price : number | undefined;

  constructor(
    private http : HttpClient, private httpService : HttpService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalProductComponent, {
      width: '550px',
      data: {
        id : this.id, 
        description : this.description, 
        price : this.price
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  openDialog2(products: any, id: any, description: any, price : any){
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '350px',
      data: {
        product : products, 
        id: id, 
        description: description, 
        price: price
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  openDialog3(){
    const dialogRef = this.dialog.open(DadosComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  async list(){
    this.products = await this.httpService.get('product');
    console.log(this.products)
  }

}
