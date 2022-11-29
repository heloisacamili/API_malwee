import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
export interface DialogDataDados {
  products : Array <any>;
  id : number;
  fkGroup : number;
  fkSubgroup : number;
  fkCollection : number;
}

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent implements OnInit {
  products : Array <any> = [];
  public group : Array <any> = [];
  public subgroup : Array <any> = [];
  public collection : Array <any> = [];
  description : string ='';
  price : number | undefined;

  constructor(
    public dialogRef: MatDialogRef<DadosComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) private data :DialogDataDados
  ) { }

  ngOnInit(): void {
    this.products.push(this.data.products);
    this.getGroup();
    this.getSubgroup();
    this.getCollection();
  }

  async getGroup(){
    this.group = await this.httpService.get(`group/${this.data.fkGroup}`);

  }
  async getSubgroup(){
    this.subgroup = await this.httpService.get(`subgroup/${this.data.fkSubgroup}`);

  }
  async getCollection(){
    this.collection = await this.httpService.get(`collection/${this.data.fkCollection}`);

  }

}
