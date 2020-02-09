import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalWebsite';

  hamburgerClick() {
    const element = document.getElementById("hamburgerIcon");
    
    if (element.classList.contains("is-active")) {
      element.classList.remove("is-active");
    } else {
      element.classList.add("is-active");
    }
  }
}
