import { Component, OnInit } from '@angular/core';
import jQuery from 'jquery';
import { document } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-project-portfolio',
  templateUrl: './project-portfolio.component.html',
  styleUrls: ['./project-portfolio.component.scss']
})
export class ProjectPortfolioComponent implements OnInit {

  projects = new Array();
  static carouselInterval = 1000;
  public carouselLoaded = false;

  public classReference = ProjectPortfolioComponent;

  constructor() { }

  ngOnInit() {
    this.projects = [{
      name: "Homework Tracker",
      language: "C#",
      date: "January, 2019",
      description: "Homework Tracker lets the user add multiple classes depending on their" +
        " schedule. The user can then apply a priority based on the need in which the tasks " +
        "need to be completed. The user can also add or remove tasks at ease. With the ability " +
        "to save and load files, the application data can be eaisly transfered. It is not just " +
        " limited to homework, this application can also be applied to other tasks as well since " +
        "all text input is free text.",
      images: [{
        src: "../../assets/Projects/HomeworkTracker-1.png",
        alt: "Homework Tracker 1"
      }, {
        src: "../../assets/Projects/HomeworkTracker-2.png",
        alt: "Homework Tracker 2"
      }, {
        src: "../../assets/Projects/HomeworkTracker-3.png",
        alt: "Homework Tracker 3"
      }]

    }, {
      name: "Mosaic Maker",
      language: "C#",
      date: "December, 2018",
      description: "This application allows for the creation of beautiful " +
        "mosaic style images. Using a user input image and a user specified " +
        "block size the application will average the color of the pixels within " +
        "a block to then paste the averaged color into the new mosaic image. " +
        "Options include a block size specifier, square or triangle blocks, " +
        "black and white conversion, and even a picture mosaic. With the picture " +
        "mosaic, a folder of input images can be used to take place of the average " +
        "color of a block to create a beautiful image created from other images. All " +
        "created images can then be saved to the machine in any picture format.",
      images: [{
        src: "../../assets/Projects/MosaicMaker-1.png",
        alt: "Mosaic Maker 1"
      }, {
        src: "../../assets/Projects/MosaicMaker-2.png",
        alt: "Mosaic Maker 2"
      }, {
        src: "../../assets/Projects/MosaicMaker-3.png",
        alt: "Mosaic Maker 3"
      }, {
        src: "../../assets/Projects/MosaicMaker-4.png",
        alt: "Mosaic Maker 4"
      }, {
        src: "../../assets/Projects/MosaicMaker-5.png",
        alt: "Mosaic Maker 5"
      }, {
        src: "../../assets/Projects/MosaicMaker-6.png",
        alt: "Mosaic Maker 6"
      }]

    }, {
      name: "Password Manager",
      language: "Java",
      date: "April, 2019",
      description: "The Password Manager allows the user to keep track of " +
        "multiple accounts and their associated passwords. It has multiple search " +
        " methods such as category and free text search. Paired with a passsword " +
        "generator and analyzer, this application can produce strong passwords, as " +
        "well as inform the user of how strong their password is. All accounts with " +
        "their associated passwords can be saved to an AES encrypted text file for " +
        "easy transfer to other machines.",
      images: [{
        src: "../../assets/Projects/PasswordManager-1.png",
        alt: "Password Manager 1"
      }, {
        src: "../../assets/Projects/PasswordManager-2.png",
        alt: "Password Manager 2"
      }, {
        src: "../../assets/Projects/PasswordManager-3.png",
        alt: "Password Manager 3"
      }, {
        src: "../../assets/Projects/PasswordManager-4.png",
        alt: "Password Manager 4"
      }, {
        src: "../../assets/Projects/PasswordManager-5.png",
        alt: "Password Manager 5"
      }, {
        src: "../../assets/Projects/PasswordManager-6.png",
        alt: "Password Manager 6"
      }, {
        src: "../../assets/Projects/PasswordManager-7.png",
        alt: "Password Manager 7"
      }, {
        src: "../../assets/Projects/PasswordManager-8.png",
        alt: "Password Manager 8"
      }]

    }, {
      name: "Weather Data Analysis",
      language: "C#",
      date: "November, 2018",
      description: "Weather Data Analysis allows a csv to be loaded or saved to display " +
        "monthly and yearly weather statistics. Yearly statistics display the highest and " +
        "lowest temperatures and precipitations with the corresponding day. Output is formatted " +
        "with yearly statistics first, then by a monthly breakdown for each year. Options " +
        "include a histogram output, displaying days above or below a threshold, adding or removing days, " +
        "editing inconsistant data, and file export.",
      images: [{
        src: "../../assets/Projects/WeatherAnalysis-1.png",
        alt: "Weather Analysis 1"
      }, {
        src: "../../assets/Projects/WeatherAnalysis-2.png",
        alt: "Weather Analysis 2"
      }, {
        src: "../../assets/Projects/WeatherAnalysis-3.png",
        alt: "Weather Analysis 3"
      }]

    }, {
      name: "Word Scramble",
      language: "C++",
      date: "May, 2019",
      description: "Word Scramble is a game created in C++ to challenge the user. " +
        "With options for a time limit and a letter count, the user can make the game " +
        "as difficult as they want. The program chooses a random letter up to the " +
        "user specified letter count. Then using the letters, it checks against a pre-" +
        "defined dictionary to ensure only valid words are displayed. High Scores are " +
        "tracked to give the user the incentive to get the best score possible.",
      images: [{
        src: "../../assets/Projects/WordScramble-1.png",
        alt: "Word Scramble 1"
      }, {
        src: "../../assets/Projects/WordScramble-2.png",
        alt: "Word Scramble 2"
      }, {
        src: "../../assets/Projects/WordScramble-3.png",
        alt: "Word Scramble 3"
      }]

    }, {
      name: "Legacy Website",
      language: "HTML/CSS/JavaScript",
      date: "Feburary, 2017",
      description: "The first website I made back in 2017 when I was" +
        " first getting into coding. The site was created purely to learn" +
        " about HTML, CSS, and Javascript. It was given a theme to make it" +
        " a little more interesting to create. And it is posted here as a" +
        " reminder of my first project, and to show the difference in the" +
        " quality of code from that site to this one a few years later." +
        " (Since it was my first experience with web development, I do not" +
        " guarantee it to be free of errors or compatible with all browsers.)",
      images: [{
        src: "../../assets/Projects/LegacyWebsite-1.png",
        alt: "Legacy Website 1"
      }, {
        src: "../../assets/Projects/LegacyWebsite-2.png",
        alt: "Legacy Website 2"
      }, {
        src: "../../assets/Projects/LegacyWebsite-3.png",
        alt: "Legacy Website 3"
      }, {
        src: "../../assets/Projects/LegacyWebsite-4.png",
        alt: "Legacy Website 4"
      }],
      link: "../assets/LegacyWebsite/index.html",
      linkDescription: "Click here to view the site"
    }, {
      name: "Secret Arcade",
      language: "HTML/SCSS/TypeScript",
      date: "August, 2020",
      description: "There is an image hidden on this page that will link to " +
      "a Secret Arcade. This arcade is filled with some of my game projects that " +
      "I have created to help refine some of my TypeScript skills. Games include " +
      "Block Stacker (a game like Tetris), Bomb Duster (a game like Minesweeper), and " +
      "Picture Puzzle (a game like 15 puzzle).",
      images: [{
        src: "../../assets/Arcade/BlockStacker.png",
        alt: "Block Stacker"
      }, {
        src: "../../assets/Arcade/BombDuster.png",
        alt: "Bomb Duster"
      }, {
        src: "../../assets/Arcade/PicturePuzzle.png",
        alt: "Picture Puzzle"
      }],
      link: "/arcade-page-component",
      linkDescription: "Or click here to directly view the arcade"
    }];
  }

  ngAfterViewInit() {

    [].map.call(
      document.querySelectorAll('.carousel-control'),
      ((carouselControl: HTMLElement) => {

        carouselControl.style.cursor = "pointer";
      })
    );

    [].map.call(
      document.querySelectorAll('.carousel'),
      ((carousel: HTMLElement) => {

        carousel.style.outline = "none";
      })
    );

    [].map.call(
      document.querySelectorAll('.left-side'),
      ((slider: HTMLElement) => {

        slider.addEventListener('mouseenter', e => {

          var x = window.scrollX;
          var y = window.scrollY;
          window.onscroll = function () { window.scrollTo(x, y); };

        }, { passive: true });

        slider.addEventListener('mouseleave', e => {

          window.onscroll = function () { };

        }, { passive: true });

        let scrollDirection;
        let scrollAmount = 0;

        slider.addEventListener('wheel', (e) => {

          scrollDirection = e.deltaY;

          if (scrollDirection < 0) {
            scrollAmount = slider.scrollWidth / 8;
            slider.scrollLeft -= scrollAmount;
          } else {
            scrollAmount = slider.scrollWidth / 8;
            slider.scrollLeft += scrollAmount;
          }

        }, { passive: true });
      })
    );

    [].map.call(
      document.querySelectorAll('.carousel-item'),
      ((carouselItem: HTMLElement) => {

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          var images: any = carouselItem.getElementsByTagName('img');
          var img = images[0] as HTMLImageElement;
          img.setAttribute('loading', 'eager');
        }

        if (carouselItem.classList.contains("active")) {

          var images: any = carouselItem.getElementsByTagName('img');
          for (var image of images) {
            var img = image as HTMLImageElement;
            img.setAttribute('loading', 'eager');
          }
        }
      })
    );
  }


  arcadeClick() {
    window.scrollTo(0, 0);
  }

  projectItemSlide(currentItemIndex: number) {
    var projectItems = document.getElementsByClassName("carousel-item");
    if(projectItems) {
      var currentItem = projectItems[currentItemIndex];
      setTimeout(function () {
        currentItem.getElementsByClassName("left-side")[0].scrollRight += 5;
        setTimeout(function () {
          currentItem.getElementsByClassName("left-side")[0].scrollLeft += 5;
        }, 50);
      }, 250);
    }
  }
}

jQuery(document).scroll(function (this: any) {
  var y = jQuery(this).scrollTop();
  var height = jQuery(".hero-container").height();

  if (y && height && y > height) {
    if (!this.carouselLoaded) {
      ProjectPortfolioComponent.carouselInterval = 10000;
      this.carouselLoaded = true;
    }
  }
});




