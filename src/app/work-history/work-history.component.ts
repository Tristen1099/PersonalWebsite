import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.scss']
})
export class WorkHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  articleHover(element: any) {
    let articleContent = element.getElementsByClassName("articleContent")[0];
    let subDetails = articleContent.getElementsByClassName("subDetails");
    for(let index = 0; index < subDetails.length; index++) {
      subDetails[index].style.transition = "max-height 1.1s, opacity .5s";
      subDetails[index].style.maxHeight = "200px";
      subDetails[index].style.opacity = "1";
      
    }
  }

  articleLeave(element: any) {
    let articleContent = element.getElementsByClassName("articleContent")[0];
    let subDetails = articleContent.getElementsByClassName("subDetails");
    for(let index = 0; index < subDetails.length; index++) {
      subDetails[index].style.transition = "max-height .7s, opacity .5s";
      subDetails[index].style.maxHeight = "0";
      subDetails[index].style.opacity = "0";
    }
  }


}
