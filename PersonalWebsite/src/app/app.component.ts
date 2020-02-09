import { Component, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalWebsite';

  hamburgerClick() {
    const element = document.getElementById("hamburgerIcon");
    console.log(element);
    if (element.classList.contains("is-active")) {
      element.classList.remove("is-active");
    } else {
      element.classList.add("is-active");
    }
  }
}
