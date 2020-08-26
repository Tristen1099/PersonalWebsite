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
      imageSource: "../../assets/Arcade/BlockStacker.png",
      title: "BLOCK STACKER"
    }, {
      routerLink: "/arcade-page-component/bomb-duster",
      imageSource: "../../assets/Arcade/BombDuster.png",
      title: "BOMB DUSTER"
    }, {
      routerLink: "/arcade-page-component/bomb-duster",
      imageSource: "../../assets/Arcade/BombDuster.png",
      title: "BOMB DUSTER"
    }, {
      routerLink: "/arcade-page-component/bomb-duster",
      imageSource: "../../assets/Arcade/BombDuster.png",
      title: "BOMB DUSTER"
    }];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });
  }
}
