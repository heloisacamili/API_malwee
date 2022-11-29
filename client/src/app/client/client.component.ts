import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalClientComponent } from '../modal-client/modal-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
export interface DialogDataClient {
  id : number,
  name : string,
  cnpj : string, 
  socialReason : string, 
  clienteDesde: string
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  name : string = '';
  cnpj : string = '';
  socialReason : string = '';
  clienteDesde : string = '';
  clients : Array<any> = [];
  id: any;
  pesquisar: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalClientComponent, {
      width: '900px',
      data: {
        id : this.id, 
        name : this.name, 
        cnpj : this.cnpj, 
        socialReason : this.socialReason, 
        clienteDesde : this.clienteDesde
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  openDialog2(clients : any, id : any, name : any, cnpj : any, socialReason: any, clienteDesde: any){
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '900px',
      data: {
        clients: clients, 
        id : id, 
        nome : name, 
        cnpj : cnpj, 
        socialReason : socialReason, 
        clienteDesde : clienteDesde}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  async refresh(){
    this.list();
  }

  async list(){
    this.clients = await this.httpService.get('client');
    console.log(this.clients);
  }
}
