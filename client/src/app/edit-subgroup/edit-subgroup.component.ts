import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataSubGroup {
  id : number,
  nameProduct : string;
}

@Component({
  selector: 'app-edit-subgroup',
  templateUrl: './edit-subgroup.component.html',
  styleUrls: ['./edit-subgroup.component.scss']
})
export class EditSubgroupComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  nameProduct : string = '';
  subgroups : Array<any> = [];
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<EditSubgroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataSubGroup) { }

  ngOnInit(): void {
  }

  editar = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.editar.hasError('required')) {
      return 'Você precisa de uma descrição!';
    }

    return this.editar.hasError('subgrupo') ? 'Not a valid subgrupo' : '';
  }

  async delete(){
    this.subgroups =  await this.httpService.patch(`subgroup/${this.data.id}`, {});
    console.log('deletado!')
  }

  async edit(nameProduct : any){
    this.data.nameProduct = nameProduct
    this.subgroups =  await this.httpService.put('subgroup/', {id : this.data.id, nameProduct : this.data.nameProduct});
    console.log('editado!')
    this.clean();
  }

  async clean(){
    this.nameProduct = '';
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
