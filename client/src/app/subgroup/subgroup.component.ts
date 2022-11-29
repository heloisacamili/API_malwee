import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalSubgroupComponent } from '../modal-subgroup/modal-subgroup.component';
import { EditSubgroupComponent } from '../edit-subgroup/edit-subgroup.component';
export interface DialogDataSubGroup {
  id: number,
  description: string;
}

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit {
  description : string = '';
  subgroups : Array<any> = []
  fk: number = 0;
  id: any;
  pesquisar: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalSubgroupComponent, {
      width: '500px',
      data: {
        idGrupo : this.id, 
        description: this.description
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  openDialog2(subgroup: any, id: any, description: any){
    const dialogRef = this.dialog.open(EditSubgroupComponent, {
      width: '350px',
      data: {
        subgroup: subgroup, 
        id: id, 
        description: description
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list();
    });
  }

  async list(){
    this.subgroups = await this.httpService.get('subgroup');
    console.log(this.subgroups)
  }

}


