import { Component } from "@angular/core";
import "./sticky.js";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  vid;
  // start video at frame 0
  frameNumber = 0;
  setHeight;
  // lower numbers = faster playback
  playbackConst = 1000;

  ngOnInit() {
    window.enterView({
      selector: "section",
      enter: function(el) {
        el.classList.add("entered");
      }
    });
  }

  ngAfterViewInit() {
    // get page height from video duration
    (this.setHeight = document.getElementById("set-height")),
      // select video element
      (this.vid = document.getElementById("v0"));
    // var vid = $('#v0')[0]; // jquery option

    // dynamically set the page height according to video length
    this.vid.addEventListener("loadedmetadata", () => {
      this.setHeight.style.height =
        Math.floor(this.vid.duration) * this.playbackConst + "px";
    });
    window.requestAnimationFrame(this.scrollPlay);
  }

  // Use requestAnimationFrame for smooth playback
  private scrollPlay() {
    var frameNumber = window.pageYOffset / this.playbackConst;
    this.vid.currentTime = frameNumber;
    window.requestAnimationFrame(this.scrollPlay);
  }
}
