import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-arcade-page',
  templateUrl: './arcade-page.component.html',
  styleUrls: ['./arcade-page.component.scss']
})
export class ArcadePageComponent implements OnInit {

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

}
