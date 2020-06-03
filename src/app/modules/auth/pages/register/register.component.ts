import { Component, OnInit } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  doRegister($event: IFormSubmit<IRegister>) {

  }
 
}
