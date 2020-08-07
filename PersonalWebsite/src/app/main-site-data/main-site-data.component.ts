import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-main-site-data',
  templateUrl: './main-site-data.component.html',
  styleUrls: ['./main-site-data.component.scss']
})
export class MainSiteDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = true;
    });
  }

}
