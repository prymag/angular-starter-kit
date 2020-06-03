import { Component, OnInit } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  doRegister($event: IFormSubmit<IRegister>) {

  }
 
}
