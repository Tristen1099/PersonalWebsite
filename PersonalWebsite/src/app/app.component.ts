import { Component, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalWebsite';

  hamburgerClick() {
    const element = document.getElementById("hamburgerIcon");

    if (element.classList.contains("is-active")) {
      element.classList.remove("is-active");
    } else {
      element.classList.add("is-active");
    }
  }

  @HostListener('window:load', ['$event'])
  onLoadHandler(event) {
    [].map.call(
      document.querySelectorAll('nav-link'),
      ((item: Element) => {
        if (item.classList.contains('active')) {
          item.classList.remove('active')
        }
      })
    )
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    window.scrollTo(0, 0);
  }

}

$(document).ready(function () {
  $("a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
});