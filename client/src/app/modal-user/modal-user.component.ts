import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  name:string = '';
  username :string = '';
  password = '';
  cpassword = '';
  users:Array<any> = [];
  id: number | undefined;
  html: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalUserComponent>, private http : HttpClient, private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }

  public htmlAdd(){
    this.html = 'true';
}

  cancel(): void {
    this.dialogRef.close();
  }

  async add(){
    this.users =  await this.httpService.post('user', {name : this.name, username : this.username, password : this.password, cpassword : this.cpassword});
    console.log(this.name);
    console.log('adicionado!')
    this.clean()
  }

  clean(): void {
    this.name = ''
    this.username = ''
    this.password = ''
    this.cpassword = ''
  }

}
