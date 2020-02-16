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
      name: "Homework Tracker",
      language: "C#",
      date: "January, 2019",
      description: "Homework Tracker lets the user add multiple classes depending on their" +
        " schedule. The user can then apply a priority based on the need in which the tasks " +
        "need to be completed. The user can also add or remove tasks at ease. With the ability " +
        "to save and load files, this application can also be applied to other tasks as well.",
      images: [{
        src: "../../assets/Projects/HomeworkTracker-1.png",
        title: "Homework Tracker 1"
      }, {
        src: "../../assets/Projects/HomeworkTracker-2.png",
        title: "Homework Tracker 2"
      }, {
        src: "../../assets/Projects/HomeworkTracker-3.png",
        title: "Homework Tracker 3"
      }]

    }, {
      name: "Mosaic Maker",
      language: "C#",
      date: "December, 2018",
      description: "Description for Mosaic Maker",
      images: [{
        src: "../../assets/Projects/MosaicMaker-1.png",
        title: "Mosaic Maker 1"
      }, {
        src: "../../assets/Projects/MosaicMaker-2.png",
        title: "Mosaic Maker 2"
      }, {
        src: "../../assets/Projects/MosaicMaker-3.png",
        title: "Mosaic Maker 3"
      }, {
        src: "../../assets/Projects/MosaicMaker-4.png",
        title: "Mosaic Maker 4"
      }, {
        src: "../../assets/Projects/MosaicMaker-5.png",
        title: "Mosaic Maker 5"
      }, {
        src: "../../assets/Projects/MosaicMaker-6.png",
        title: "Mosaic Maker 6"
      }]

    }, {
      name: "Password Manager",
      language: "Java",
      date: "April, 2019",
      description: "Description for Password Manager",
      images: [{
        src: "../../assets/Projects/PasswordManager-1.png",
        title: "Password Manager 1"
      }, {
        src: "../../assets/Projects/PasswordManager-2.png",
        title: "Password Manager 2"
      }, {
        src: "../../assets/Projects/PasswordManager-3.png",
        title: "Password Manager 3"
      }, {
        src: "../../assets/Projects/PasswordManager-4.png",
        title: "Password Manager 4"
      }, {
        src: "../../assets/Projects/PasswordManager-5.png",
        title: "Password Manager 5"
      }, {
        src: "../../assets/Projects/PasswordManager-6.png",
        title: "Password Manager 6"
      }, {
        src: "../../assets/Projects/PasswordManager-7.png",
        title: "Password Manager 7"
      }, {
        src: "../../assets/Projects/PasswordManager-8.png",
        title: "Password Manager 8"
      }]

    }, {
      name: "Weather Data Analysis",
      language: "C#",
      date: "November, 2018",
      description: "Description for Weather Analysis",
      images: [{
        src: "../../assets/Projects/WeatherAnalysis-1.png",
        title: "Weather Analysis 1"
      }, {
        src: "../../assets/Projects/WeatherAnalysis-2.png",
        title: "Weather Analysis 2"
      }, {
        src: "../../assets/Projects/WeatherAnalysis-3.png",
        title: "Weather Analysis 3"
      }]

    }, {
      name: "Word Scramble",
      language: "C++",
      date: "May, 2019",
      description: "Description for Word Scramble.",
      images: [{
        src: "../../assets/Projects/WordScramble-1.png",
        title: "Word Scramble 1"
      }, {
        src: "../../assets/Projects/WordScramble-2.png",
        title: "Word Scramble 2"
      }, {
        src: "../../assets/Projects/WordScramble-3.png",
        title: "Word Scramble 3"
      }]

    }];
  }

  ngAfterViewInit() {

    document.getElementById("project-carousel").children[0].classList.add("active");
  }

}
