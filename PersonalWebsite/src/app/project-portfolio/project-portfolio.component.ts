import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-portfolio',
  templateUrl: './project-portfolio.component.html',
  styleUrls: ['./project-portfolio.component.scss']
})
export class ProjectPortfolioComponent implements OnInit {

  projects = new Array();

  constructor() { }

  ngOnInit() {
    this.projects = [{
      name: "Word Scramble",
      language: "C++",
      date: "May, 2019",
      description: "This word scrabmle game lets the user choose from...."

    }, {
      name: "Word Scramble",
      language: "C++",
      date: "May, 2019",
      description: "This word scrabmle game lets the user choose from...."

    }, {
      name: "Word Scramble",
      language: "C++",
      date: "May, 2019",
      description: "This word scrabmle game lets the user choose from...."

    }];
  }

  ngAfterViewInit() {

    document.getElementById("project-carousel").children[0].classList.add("active");
  }

}
