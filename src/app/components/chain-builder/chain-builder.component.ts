import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
declare var $ :any;
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-chain-builder',
  templateUrl: './chain-builder.component.html',
  styleUrls: ['./chain-builder.component.css'],
  providers: [ MediaService ]
})
export class ChainBuilderComponent implements OnInit {
  mobileQuery: MediaQueryList;
  public imagesList: any;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private mediaService: MediaService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

    touchHandler(event) {
        if($(event.target).hasClass('small-jewles')){
          var touch = event.changedTouches[0];

          var simulatedEvent = document.createEvent("MouseEvent");
              simulatedEvent.initMouseEvent({
              touchstart: "mousedown",
              touchmove: "mousemove",
              touchend: "mouseup"
          }[event.type], true, true, window, 1,
              touch.screenX, touch.screenY,
              touch.clientX, touch.clientY, false,
              false, false, false, 0, null);

          touch.target.dispatchEvent(simulatedEvent);
          event.preventDefault();  
        }
    }

    init() {
      document.addEventListener("touchstart", this.touchHandler, true);
      document.addEventListener("touchmove", this.touchHandler, true);
      document.addEventListener("touchend", this.touchHandler, true);
      document.addEventListener("touchcancel", this.touchHandler, true);
  }


  ngOnInit(){
    this.init();
    $(".draggable").draggable({
      start: function(e, ui) {
        $(".first-div").append($(e.target).clone());
      },
      stop: function(e, ui) {
        
      }
    });
    $(".chain-image").droppable({
      drop: function(event, ui) {
            var newClone = $(ui.helper).clone();
            $(this).after(newClone);
      }
    });

    this.mediaService.getImages(1)
    .subscribe( (success) => {
      this.imagesList = success;
      setTimeout(function(){
        $(".small-jewles").draggable({
          revert: "invalid",
          helper: "clone",
          start: function(e, ul){
          },
          stop: function(e, ul){
          }
        });
      }, 1000);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  dragStart($event){

  }

  title = 'builder';
}
