import { Component, HostListener } from '@angular/core';
import jQuery from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalWebsite';
  static mainPage = true;

  public classReference = AppComponent;

  hamburgerClick() {
    const element = document.getElementById("hamburgerIcon");

    if (!element) {
      return;
    }

    if (element.classList.contains("is-active")) {
      element.classList.remove("is-active");
    } else {
      element.classList.add("is-active");
    }
  }

  arcadeClick() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:load', ['$event'])
  onLoadHandler() {
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
  unloadHandler() {
    window.scrollTo(0, 0);
  }

}

jQuery(document).ready(function () {
  jQuery("a").on('click', function (this: HTMLAnchorElement, event: any) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      hash = hash.replace(/\//g, '');
      if (jQuery(hash).offset()) {
        var offset = jQuery(hash).offset();
        if (offset) {
          var scrollPos = offset.top;
          jQuery('html, body').animate({
            scrollTop: scrollPos
          }, 800, function () {
            window.location.hash = hash;
          });
        }
      }
    }
  });
});

jQuery(document).scroll(function () {
  var y = jQuery(this).scrollTop();
  var height = jQuery(".hero-container").height();
  var box = document.getElementById("resumeButton");

  if (box == null) {
    return;
  }

  if (!y || !height || y < height) {
    if (box.style.opacity !== "0") {
      var oppArray = ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];
      var x = 0;
      (function next() {
        box.style.opacity = oppArray[x];
        if (++x < oppArray.length) {
          setTimeout(next, 50);
        }
      })();
      box.style.display = "none";
    }
  } else {
    if (box.style.opacity !== "1") {
      box.style.display = "block";
      var oppArray = ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"];
      var x = 0;
      (function next() {
        box.style.opacity = oppArray[x];
        if (++x < oppArray.length) {
          setTimeout(next, 50);
        }
      })();
    }
  }
});