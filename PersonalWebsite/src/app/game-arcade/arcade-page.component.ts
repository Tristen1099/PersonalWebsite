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
      title: "BLOCK STACKER",
      description: "Block Stacker is a tile-matching game. Adapted from the classic game Tetris. " +
        "You must complete lines by moving differently shaped pieces, which descend from the top of the " +
        "playing field. The completed lines disappear and will give you points based on how many lines you clear."
    }, {
      routerLink: "/arcade-page-component/bomb-duster",
      imageSource: "../../assets/Arcade/BombDuster.png",
      title: "BOMB DUSTER",
      description: "Bomb duster is a bomb finding puzzle game. Adapted from the classic game Minesweeper. " +
        "You must clear a board containing hidden bombs without detonating any of them, with help from clues " +
        "about the number of neighboring bombs in each field, you win once the whole board is cleared."
    }, {
      routerLink: "/arcade-page-component/bomb-duster",
      imageSource: "../../assets/Arcade/BombDuster.png",
      title: "BOMB DUSTER",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor ligula porttitor, lacinia sapien non."
    }, {
      routerLink: "/arcade-page-component/bomb-duster",
      imageSource: "../../assets/Arcade/BombDuster.png",
      title: "BOMB DUSTER",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor ligula porttitor, lacinia sapien non."
    }];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AppComponent.mainPage = false;
    });

    if (window.innerWidth > 1000) {
      [].map.call(
        document.querySelectorAll('.arcade-content'),
        ((content: HTMLElement) => {

          let siblings = [];
          let sibling = content.parentNode.firstChild;
          for (; sibling; sibling = sibling.nextSibling) {
            if (sibling.nodeType == 1 && sibling != content) {
              siblings.push(sibling);
            }
          }

          content.addEventListener('mouseenter', e => {

            for (let sib of siblings) {
              (sib as HTMLElement).classList.add("blur");
            }
          });

          content.addEventListener('mouseleave', e => {

            for (let sib of siblings) {
              (sib as HTMLElement).classList.remove("blur");
            }
          });
        })
      );
    }

  }
}
