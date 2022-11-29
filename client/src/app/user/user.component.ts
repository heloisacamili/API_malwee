import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users : Array<any> = [];
  user : string = "";
  name : string = "";
  username : string = "";
  password : string = "";
  cpassword : string = "";
  pesquisar : string = '';
  constructor(private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list()
  }

  openDialog(): void {
    const ref = this.dialog.open(ModalUserComponent, {
      width: '500px',
    });
    ref.afterClosed().subscribe(result => {
      this.list();
    })
  }

  openDialog2(users : any, id : any, name : any, username : any, password : any, cpassword : any) {
    const ref = this.dialog.open(EditUserComponent, {
      width: '350px',
      data : {
        users :users,
        id : id,
        name : name,
        username : username,
        password : password,
        cpassword : cpassword
      }
    });
    ref.afterClosed().subscribe(result => {
      this.list();
    })
  }

  teste(){
    this.users.push({name : this.name, username : this.username,
      password : this.password, cpassword : this.cpassword})
    console.log(this.users)
  }

  async list(){
    this.users = await this.httpService.get('user');
    console.log(this.users)
  }

}
