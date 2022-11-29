import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
import {FormControl, Validators} from '@angular/forms';
export interface DialogDataGroup {
  id: number,
  description: string;
}

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  description : string = '';
  groups : Array<any> = [];
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<EditGroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataGroup) { }

  ngOnInit(): void {
  }

  insert = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.insert.hasError('required')) {
      return 'Você precisa de uma descrição!';
    }

    return this.insert.hasError('grupo') ? 'Not a valid email' : '';
  }

  async delete(){
    this.groups =  await this.httpService.patch(`group/${this.data.id}`, {});
    console.log('deletado!')
  }

  async edit(description : any){
    this.data.description = description
    this.groups =  await this.httpService.put('group/', {id: this.data.id, description: this.data.description});
    console.log('editado!')
    this.clean();
  }

  async clean(){
    this.description = '';
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
