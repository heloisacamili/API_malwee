import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
export interface DialogDataUser {
  id : number, 
  name : string,
  username : string, 
  password : string, 
  cpassword : string
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  name : string = '';
  username : string = '';
  password = '';
  cpassword = '';
  users : Array<any> = [];
  id: number | undefined;
  html: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>, private http : HttpClient, private httpService : HttpService,  @Inject(MAT_DIALOG_DATA) public data: DialogDataUser
  ) { }

  ngOnInit(): void {
  }

  async delete(){
    this.users =  await this.httpService.patch(`user/${this.data.id}`, {});
    console.log('deletado!')
  }

  async edit(){
    this.users =  await this.httpService.put('user', {id: this.data.id, password : this.data.password, cpassword : this.data.cpassword});
    console.log('editado!')
    this.clean()
  }

  clean(): void {
    this.name = ''
    this.username = ''
    this.password = ''
    this.cpassword = ''
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
