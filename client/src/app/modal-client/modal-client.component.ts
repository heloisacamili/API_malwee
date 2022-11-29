import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CepServiceService } from 'src/services/cep-service.service';
import { HttpService } from 'src/services/http.service';
export interface DialogDataClient {
  clients : Array<any>;
  id : number;
  name : string,
  cnpj : string, 
  socialReason : string, 
  clienteDesde : Date,
  rua : string,
  bairro : string,
  cidade : string,
  estado : string,
  cep : string,
  num : string,
  complemento : string,
  pontoRef : string,
}

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  name : string = '';
  cnpj : string = '';
  socialReason : string = '';
  clienteDesde : Date = new Date(2022, 0, 1);
  clients : Array<any> = [];
  id: number | undefined;
  html: string = '';
  address: Array<any>=[];
  newAddress: Array<any>=[];
  startDate : Date = new Date(2022, 0, 1);
  rua: string='';
  bairro: string ='';
  cidade: string='';
  estado: string ='';
  pontoRef: string ='';
  complemento: string ='';
  num: number | undefined;
  cep: string = '';
  createdAt : Date | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalClientComponent>, private httpClient : HttpClient, private httpService : HttpService, 
    private cepsService : CepServiceService
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }
  public htmlAdd(){
    this.html = 'true';
  }

  consultaCep(){
    this.cepsService.buscar(String(this.cep)).subscribe((dados) => this.populaForm(dados));
  }

  populaForm(dados : any){
      this.cep = dados.cep,
      this.bairro = dados.bairro,
      this.rua = dados.logradouro,
      this.cidade = dados.localidade,
      this.estado = dados.uf
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.clients =  await this.httpService.post('client', {name : this.name, cnpj : this.cnpj, socialReason : this.socialReason, clienteDesde : this.createdAt, address : this.newAddress});
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
    this.num = undefined;
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