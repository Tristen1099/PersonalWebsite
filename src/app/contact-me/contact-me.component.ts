import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jQuery from 'jquery';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  validName = false;
  validEmail = false;
  validMessage = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  closeOverlay() {
    var formSubmitDiv = document.getElementById("formSubmitOverlay");
    if (formSubmitDiv) {
      formSubmitDiv.style.display = "none";
    }
    
    document.getElementsByTagName('body')[0].style.overflowY = "scroll";
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/meqvqkrr',
      { FROM: "tristen.codes", NAME: contactName, EMAIL: contactEmail, MESSAGE: contactMessage },
      { 'headers': headers }).subscribe(
        data => this.formSubmitSuccess(),
        error => this.formSumbitError()
      );
  }

  private formSubmitSuccess() {
    const overlay = document.getElementById("formSubmitOverlay");
    if (overlay == null) {
      return;
    }
    overlay.style.display = "block";
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    overlay.children[0].children[0].innerHTML = "Form submitted";
    overlay.children[0].children[1].innerHTML = "Submitted successfully! Thank you, I will respond as soon as possible at the provided email!";
    (document.getElementById('formName') as HTMLInputElement).value = '';
    (document.getElementById('formEmail') as HTMLInputElement).value = '';
    (document.getElementById('formMessage') as HTMLInputElement).value = '';
  }

  private formSumbitError() {
    const overlay = document.getElementById("formSubmitOverlay");
    if (overlay == null) {
      return;
    }
    overlay.style.display = "block";
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    overlay.children[0].children[0].innerHTML = "Form not submitted";
    overlay.children[0].children[1].innerHTML = "Form submittion failed. Unfortunately the form has failed to submit. Please try again later.";
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
      jQuery("#nameError").css("visibility", "hidden");
    } else {
      this.validName = false;
      jQuery("#nameError").css("visibility", "visible");
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
        jQuery("#emailError").css("visibility", "hidden");
        jQuery("#emailErrorWrongFormat").css("display", "none");
        jQuery("#emailErrorBlank").css("display", "block");
      } else {
        this.validEmail = false;
        jQuery("#emailErrorBlank").css("visibility", "hidden");
        jQuery("#emailErrorBlank").css("display", "none");
        jQuery("#emailErrorWrongFormat").css("display", "block");
      }
    } else {
      this.validEmail = false;
      jQuery("#emailErrorBlank").css("visibility", "visible");
      jQuery("#emailErrorWrongFormat").css("display", "none");
      jQuery("#emailErrorBlank").css("display", "block");
    }
  }

  messageValidation() {
    this.checkMessage();
  }

  private checkMessage() {
    const message = (document.getElementById('formMessage') as HTMLInputElement).value;

    if (!(message === '')) {
      this.validMessage = true;
      jQuery("#messageError").css("visibility", "hidden");
    } else {
      this.validMessage = false;
      jQuery("#messageError").css("visibility", "visible");
    }
  }
}