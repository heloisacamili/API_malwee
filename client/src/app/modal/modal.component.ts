import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  description : string = '';
  groups : Array<any> = [];
  id : number | undefined;
  html : string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, private http : HttpClient, private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }

  insert = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.insert.hasError('required')) {
      return 'Você precisa de uma descrição!';
    }

    return this.insert.hasError('grupo') ? 'Not a valid grupo' : '';
  }

  public htmlAdd(){
    this.html = 'true';
}

  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.groups =  await this.httpService.post('group', {description : this.description});
    console.log(this.description);
    this.clean();
    console.log('adicionado')
  }

  async clean(){
    this.description = '';
  }

  async delete(){
    this.groups =  await this.httpService.patch(`group/${this.id}`, {});
    console.log('deletado!')
  }

  async edit(){
    this.groups =  await this.httpService.put('group', {id: this.id, description: this.description});
    console.log('editado!')
  }

}
