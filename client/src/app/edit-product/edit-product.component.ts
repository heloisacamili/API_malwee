import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataProduct {
  id : number,
  description : string,
  price : number,
  fkGroup : number,
  fkSubgroup : number,
  fkCollection : number;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  description : string = '';
  products : Array<any> = [];
  id : number | undefined;
  price : number | undefined;

  constructor(public dialogRef: MatDialogRef<EditProductComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataProduct) { }

  ngOnInit(): void {
  }

  async delete(){
    this.products =  await this.httpService.patch(`product/${this.data.id}`, {});
    console.log('deletado!')
  }

  async edit(description: any, price: any){
    this.data.description = description;
    this.data.price = price;
    this.products =  await this.httpService.put('product/', {id: this.data.id, description: this.data.description, price: this.price});
    console.log('editado!');
    this.clean();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  clean(): void {
    this.description = '';
    this.price = undefined;
  }
}
