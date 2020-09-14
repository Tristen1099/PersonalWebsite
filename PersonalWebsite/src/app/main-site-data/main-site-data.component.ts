import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-main-site-data',
  templateUrl: './main-site-data.component.html',
  styleUrls: ['./main-site-data.component.scss']
})
export class MainSiteDataComponent {

  constructor() { }

  ngAfterViewInit() {
    document.getElementsByTagName('body')[0].style.overflowY = "scroll";
    setTimeout(() => {
      AppComponent.mainPage = true;
    });
  }

}
