import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CepServiceService } from 'src/services/cep-service.service';
import { DadosComponent } from './dados/dados.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'malwee';;

  constructor(private router: Router) { 
    this.router.navigateByUrl('/login');
  }

}
