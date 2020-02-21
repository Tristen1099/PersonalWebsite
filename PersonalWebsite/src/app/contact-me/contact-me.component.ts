import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  nameError = false;
  emailError = false;
  messageError  = false;

  constructor() { }

  ngOnInit() {
  }

  submitForm(event: any) {

    const contactName = (document.getElementById('formName') as HTMLInputElement).value;
    const contactEmail = (document.getElementById('formEmail') as HTMLInputElement).value;
    const contactMessage = (document.getElementById('formMessage') as HTMLInputElement).value;

    event.preventDefault();

    $.post('https://script.google.com/macros/s/AKfycbyN4nzL1LykXY4V9SvUSbtmPX3JvlBO3ds3mKtdcVZyIag6CRI/exec', {
      name: contactName,
      email: contactEmail,
      message: contactMessage
    }).done(function () {
      console.log("Success");
    }).fail(function () {
      console.log("Fail")
    });
  }
}
