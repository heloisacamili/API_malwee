import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  description : string = '';
  price : number | undefined;
  products : Array<any> = []
  html : string = '';
  id : any;
  public groups : Array <any> = [];
  public subgroups : Array <any> = [];
  public collections : Array <any> = [];
  group : number = 0;
  subgroup: number = 0;
  collection: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalProductComponent>, private http : HttpClient, private httpService : HttpService
  ) { }

  async ngOnInit() {
   await this.Collection();
   await this.Subgroup();
   await this.Group();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.products =  await this.httpService.post('product', {description: this.description, fkGroup: this.group, fkSubgroup: this.subgroup, fkCollection: this.collection, price: this.price});
    console.log('adicionado!');
    this.clean();
  }

  clean(): void {
    this.description = '';
    this.price = undefined;
  }

  async Group(){
    this.groups = await this.httpService.get('group');
  }

  async Subgroup(){
    this.subgroups = await this.httpService.get('subgroup');
  }

  async Collection(){
    this.collections = await this.httpService.get('collection');
  }
}