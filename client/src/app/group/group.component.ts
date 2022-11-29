import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
export interface DialogDataGroup {
  id : number,
  description : string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  description : string = '';
  groups : Array<any> = []
  id: any;
  pesquisar: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {idGrupo : this.id, description: this.description}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  openDialog2(group: any, id: any, description: any){
    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '350px',
      data: {
        group: group, 
        id : id, 
        description: description
      }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  async list(){
    this.groups = await this.httpService.get('group');
    console.log(this.groups)
  }

}
