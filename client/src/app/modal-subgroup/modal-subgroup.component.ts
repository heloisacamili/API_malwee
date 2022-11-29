import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import {FormControl, Validators} from '@angular/forms';
export interface DialogDataSubGroup {
  id: number,
  description: string;
}

@Component({
  selector: 'app-modal-subgroup',
  templateUrl: './modal-subgroup.component.html',
  styleUrls: ['./modal-subgroup.component.scss']
})
export class ModalSubgroupComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  nameProduct : string = '';
  subgroups : Array<any> = [];
  id : number | undefined;
  public groups : Array <any>=[];
  group : number = 0;

  constructor(public dialogRef: MatDialogRef<ModalSubgroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataSubGroup) { }

  ngOnInit(): void {
    this.Group();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  insert = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.insert.hasError('required')) {
      return 'Você precisa de uma descrição!';
    }

    return this.insert.hasError('grupo') ? 'Not a valid email' : '';
  }

  async add(){
    this.subgroups =  await this.httpService.post('subgroup', {nameProduct : this.nameProduct, fkGroup : this.group});
    console.log(this.nameProduct);
    this.clean();
    console.log('adicionado!')
  }

  clean(): void {
    this.nameProduct = '';
  }

  async Group(){
    this.groups = await this.httpService.get('group');
  }
}
