import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalCollectionComponent } from '../modal-collection/modal-collection.component';
import { EditCollectionComponent } from '../edit-collection/edit-collection.component';
export interface DialogDataCollection {
  id: number,
  description: string;
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  description : string = '';
  collections : Array<any> = []
  id: any;
  pesquisar: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalCollectionComponent, {
      width: '550px',
      data: {
        id : this.id, 
        description: this.description
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  openDialog2(collections: any, id: any, description: any){
    const dialogRef = this.dialog.open(EditCollectionComponent, {
      width: '350px',
      data: {
        collections : collections, 
        id : id, 
        description: description
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }
  
  async list(){
    this.collections = await this.httpService.get('collection');
    console.log(this.collections)
  }
}
