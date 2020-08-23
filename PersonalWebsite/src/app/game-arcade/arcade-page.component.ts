import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-arcade-page',
  templateUrl: './arcade-page.component.html',
  styleUrls: ['./arcade-page.component.scss']
})
export class ArcadePageComponent implements OnInit {

  games = new Array();

  ngOnInit() {
    this.games = [{
      routerLink: "/arcade-page-component/block-stacker",
      imageSource: "../../assets/Arcade/BlockStacker.png"
    }, {
      routerLink: "/arcade-page-component/block-stacker",
      imageSource: "../../assets/Arcade/BlockStacker.png"
    }, {
      routerLink: "/arcade-page-component/block-stacker",
      imageSource: "../../assets/Arcade/BlockStacker.png"
    }, {
      routerLink: "/arcade-page-component/block-stacker",
      imageSource: "../../assets/Arcade/BlockStacker.png"
    }];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }
}
