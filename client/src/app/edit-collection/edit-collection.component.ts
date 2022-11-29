import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataCollection {
  id : number,
  description : string;
}

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  description : string = '';
  collections : Array<any> = [];
  id : number | undefined;

  constructor(public dialogRef: MatDialogRef<EditCollectionComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataCollection) { }

  ngOnInit(): void {
  }

  insert = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.insert.hasError('required')) {
      return 'Você precisa de uma descrição!';
    }

    return this.insert.hasError('coleção') ? 'Not a valid collection' : '';
  }


  async delete(){
    this.collections =  await this.httpService.patch(`collection/${this.data.id}`, {});
    console.log('deletado!')
  }

  async edit(description: any){
    this.data.description = description
    this.collections =  await this.httpService.put('collection/', {id: this.data.id, description: this.data.description});
    console.log('editado!');
    this.clean();
  }

  clean(): void{
    this.description = '';
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
