import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataClient{
  id : number,
  name : string,
  cnpj : string, 
  socialReason : string, 
  clienteDesde : string,
  rua : string,
  bairro : string,
  cidade : string,
  estado : string,
  cep : string,
  num : string,
  complemento : string,
  pontoRef : string
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  name : string = '';
  cnpj : string = '';
  clienteDesde : string = '';
  clients : Array<any> = []
  modal : string = '';
  id : any;
  socialReason: any;
  newAddress: Array<any> = [];
  rua : string = '';
  bairro : string = '';
  cidade : string = '';
  estado : string = '';
  cep : string = '';
  num : string = '';
  complemento : string = '';
  pontoRef : string = '';

  constructor(public dialogRef: MatDialogRef<EditClientComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.clients =  await this.httpService.post('client', {name : this.name, cnpj : this.cnpj, socialReason : this.socialReason, clienteDesde : this.clienteDesde});
    console.log(this.name);
    console.log('adicionado');
    this.clean();
  }

  async clean(){
    this.name = '';
    this.cnpj = '';
    this.socialReason = '';
    this.id = undefined;
    this.rua = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
    this.cep = '';
    this.num = '';
    this.complemento = '';
    this.pontoRef = '';
  }

  async delete(){
    this.clients =  await this.httpService.patch(`client/${this.id}`, {});
    console.log('deletado!')
  }

  async edit(){
    this.clients =  await this.httpService.put('client', {id: this.id, name : this.name, cnpj : this.cnpj, socialReason : this.socialReason, clienteDesde : this.clienteDesde});
    console.log('editado!')
  }

  async addAddress(){
    this.newAddress.push({
    "rua":this.rua,
    "bairro":this.bairro,
    "cidade":this.cidade,
    "estado":this.estado,
    "cep":this.cep,
    "numero":this.num,
    "complemento":this.complemento,
    "pontoDeReferencia":this.pontoRef
  })
    console.log(this.newAddress);
    this.clean();
  }
  
}
