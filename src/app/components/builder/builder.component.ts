import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
declare var $:any;
declare var ThumbnailSlider:any;
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
  public imagesList: any;
  public loading = true;
  public currentCategory = 1;
  public price = [];
  public chain_image = "/assets/images/rose-chain.png";
  public screenSize;

  constructor(private mediaService: MediaService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.init();
    this.screenSize = window.innerWidth;
    this.loadCateogry(1);
  }

  dragStart($event){

  }

  openDetails(){
    const dialogRef = this.dialog.open(DetailPopupComponent, {
      width: '400px',
      data: this.price
    });
  }

  getPrice(){
    let totalPrice = 0;
    if(this.price && this.price.length){
      for(let i=0; i<this.price.length; i++){
        totalPrice = totalPrice + Number(this.price[i].price);
      }
      return totalPrice;
    } else {
      return totalPrice;
    }
  }

  touchHandler(event) {
        if($(event.target).hasClass('pickup-jewels')){
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

    checkout(){
      this.router.navigate(['/checkout', { queryParams: JSON.stringify(this.price), chain_image: this.chain_image } ]);
    }

    init() {
      document.addEventListener("touchstart", this.touchHandler, true);
      document.addEventListener("touchmove", this.touchHandler, true);
      document.addEventListener("touchend", this.touchHandler, true);
      document.addEventListener("touchcancel", this.touchHandler, true);
    }

    loadCateogry(category){
      const that = this;
      this.currentCategory = category;
      this.loading = true;
      var slider = $('.flexslider');
      if(slider && slider.data('flexslider')){
        while (slider.data('flexslider').count > 0){
          slider.data('flexslider').removeSlide(0);
        }
      }
      this.mediaService.getImages(category)
      .subscribe( (success:any) => {
        that.currentCategory = category;
        if(slider && slider.data('flexslider')){}else{that.imagesList = success;}
        that.loading = false;
        setTimeout(function(){
          $(".droppable").droppable({
          hoverClass: "ui-state-active",
          drop: function(event, ui) {
              $(event.target).droppable('destroy');
              var newClone = $(ui.helper).clone();
              var classNumber = Number($(event.target).attr('id'));
              let clonedElement = $(ui.draggable).clone();
              $(event.target).html(""); 
              that.price.push({ position: classNumber, price: $(clonedElement).attr("id"), image_url: $(clonedElement).attr("src"), notes: $(clonedElement).attr("notes") });
              clonedElement.css('position','relative').appendTo($(event.target));
              if($(event.target).hasClass('main-div')){
                clonedElement.css('height', window.innerWidth >=420 ? "100px" : "70px");
                clonedElement.css('margin-left', window.innerWidth >=420 ? "-28px" : "-18px");
                clonedElement.css('width', window.innerWidth >=420 ? "100px" : "70px");
              } else {
                clonedElement.css('height', window.innerWidth >=420 ? "70px" : "40px");
                clonedElement.css('margin-left', window.innerWidth >=420 ? "-15px" : "0px");
                clonedElement.css('width', window.innerWidth >=420 ? "70px" : "40px");  
              }
              
              if(classNumber && classNumber > 5){
                clonedElement.css("transform", "rotate(-50deg)");
                clonedElement.css("transform-origin", "top center");
              } else if(classNumber) {
                clonedElement.css("transform", "rotate(50deg)");
                clonedElement.css("transform-origin", "top center");
              }
            }
          });
          $(".droppable-charm").droppable({
          hoverClass: "ui-state-active",
          accept: '.charm-item',
          drop: function(event, ui) {
              $(event.target).droppable('destroy');
              var newClone = $(ui.helper).clone();
              var classNumber = Number($(event.target).attr('id'));
              let clonedElement = $(ui.draggable).clone();
              $(event.target).html(""); 
              that.price.push({ position: classNumber, price: $(clonedElement).attr("id"), image_url: $(clonedElement).attr("src"), notes: $(clonedElement).attr("notes") });
              clonedElement.css('position','relative').appendTo($(event.target));
              if($(event.target).hasClass('main-div')){
                clonedElement.css('height', window.innerWidth >=420 ? "100px" : "70px");
                clonedElement.css('margin-left', window.innerWidth >=420 ? "-28px" : "-18px");
                clonedElement.css('width', window.innerWidth >=420 ? "100px" : "70px");
              } else {
                clonedElement.css('height', window.innerWidth >=420 ? "70px" : "40px");
                clonedElement.css('margin-left', window.innerWidth >=420 ? "-15px" : "0px");
                clonedElement.css('width', window.innerWidth >=420 ? "70px" : "40px");  
              }
              
              if(classNumber && classNumber > 5){
                clonedElement.css("transform", "rotate(-50deg)");
                clonedElement.css("transform-origin", "top center");
              } else if(classNumber) {
                clonedElement.css("transform", "rotate(50deg)");
                clonedElement.css("transform-origin", "top center");
              }
            }
          });
          if(slider && slider.data('flexslider')){
            while (slider.data('flexslider').count > 0){
              slider.data('flexslider').removeSlide(0);
            }
            for(let i=0; i<success.length ; i++){
              let categoryClass = category == 2 ? 'charm-item' : '';
              slider.data('flexslider').addSlide('<li><img class="pickup-jewels '+categoryClass+'" id="'+success[i].price+'"src="'+success[i].image+'"></li>');
            }
          } else {
            $('.flexslider').flexslider({
              animation: "slide",
              animationLoop: false,
              itemWidth: window.innerWidth >=420 ? 100 : 60,
              itemMargin: 5,
              slideshow: false,
              controlNav: false,
              touch:false,
              init: function(){
                $(".pickup-jewels").draggable({
                  revert: "invalid",
                  appendTo: ".example-container",
                  helper: "clone",
                  scroll: true,
                  start: function(e, ul){
                    $(ul.helper[0]).css("height", window.innerWidth >=420 ? "70px" : "50px");
                    $(ul.helper[0]).css("width", window.innerWidth >=420 ? "70px" : "50px");
                  },
                  stop: function(e, ul){
                  }
                });
              }
            });  
          }
        }, 1000);
      }, (error) => {
        that.loading = false;
      });
    }

    loadChain(type){
      switch(type){
        case 'rose':
          this.chain_image = "/assets/images/rose-chain.png";
        break;

        case 'white':
          this.chain_image = "/assets/images/white-chain.png";
        break;

        case 'yellow':
          this.chain_image = "/assets/images/yellow-chain.png";
        break;

        default:
          this.chain_image = "/assets/images/rose-chain.png";
        break;
      }
    }

}
