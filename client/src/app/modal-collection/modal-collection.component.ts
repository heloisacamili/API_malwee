import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-collection',
  templateUrl: './modal-collection.component.html',
  styleUrls: ['./modal-collection.component.scss']
})
export class ModalCollectionComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false;
  description : string = '';
  collections : Array<any> = [];
  id : number | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalCollectionComponent>, private http : HttpClient, private httpService : HttpService
  ) { }

  ngOnInit(): void {
  }

  insert = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.insert.hasError('required')) {
      return 'Você precisa de uma descrição!';
    }

    return this.insert.hasError('coleção') ? 'Not a valid collection' : '';
  }


  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.collections =  await this.httpService.post('collection', {description : this.description});
    console.log(this.description);
    this.clean();
  }

  async clean(){
    this.description = '';
  }

}
