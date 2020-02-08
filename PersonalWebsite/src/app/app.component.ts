import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalWebsite';

  hamburgerClick(event: any) {
    if(document.getElementById('hamburger-image').getAttribute('src') === '../assets/Hamburger.png') {
      document.getElementById('hamburger-image').setAttribute('src','../assets/CloseHamburger.png');
    } else {
      document.getElementById('hamburger-image').setAttribute('src','../assets/Hamburger.png');
    }
  }
}
