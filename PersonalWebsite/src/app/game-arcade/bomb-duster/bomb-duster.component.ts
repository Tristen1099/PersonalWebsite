import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-bomb-duster',
  templateUrl: './bomb-duster.component.html',
  styleUrls: ['./bomb-duster.component.scss']
})
export class BombDusterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }

}
