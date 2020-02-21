import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  validName = false;
  validEmail = false;
  validMessage = false;

  constructor() { }

  ngOnInit() {
  }

  submitForm(event: any) {

    this.checkName();
    this.checkEmail();
    this.checkMessage();
    if (!this.validName || !this.validEmail || !this.validMessage) {
      return;
    }

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


  nameValidation(event: any) {
    const regexp = new RegExp('[A-Za-z]|\\-|\\s|\\.|\\,|\\\'');
    const valid = regexp.test(event.data);
    if (!valid) {
      event.preventDefault();
      let value = (document.getElementById('formName') as HTMLInputElement).value;
      value = value.substring(0, value.length - 1);
      (document.getElementById('formName') as HTMLInputElement).value = value;
    } else {
      this.checkName();
    }
  }

  private checkName() {
    const name = (document.getElementById('formName') as HTMLInputElement).value;

    if (!(name === '')) {
      this.validName = true;
      $("#nameError").css("visibility", "hidden");
    } else {
      this.validName = false;
      $("#nameError").css("visibility", "visible");
    }
  }

  emailValidation() {
    this.checkEmail();
  }

  private checkEmail() {
    const email = (document.getElementById('formEmail') as HTMLInputElement).value;
    const regexp = new RegExp('[A-z0-9]+@{1}[A-z0-9]+\\.[A-z0-9]+');
    const valid = regexp.test(email);

    if (!(email === '')) {
      if (valid) {
        this.validEmail = true;
        $("#emailError").css("visibility", "hidden");
        $("#emailErrorWrongFormat").css("display", "none");
        $("#emailErrorBlank").css("display", "block");
      } else {
        this.validEmail = false;
        $("#emailErrorBlank").css("visibility", "hidden");
        $("#emailErrorBlank").css("display", "none");
        $("#emailErrorWrongFormat").css("display", "block");
        $
      }
    } else {
      this.validEmail = false;
      $("#emailErrorBlank").css("visibility", "visible");
      $("#emailErrorWrongFormat").css("display", "none");
      $("#emailErrorBlank").css("display", "block");
    }
  }

  messageValidation() {
    this.checkMessage();
  }

  private checkMessage() {
    const message = (document.getElementById('formMessage') as HTMLInputElement).value;

    if (!(message === '')) {
      this.validMessage = true;
      $("#messageError").css("visibility", "hidden");
    } else {
      this.validMessage = false;
      $("#messageError").css("visibility", "visible");
    }
  }
}