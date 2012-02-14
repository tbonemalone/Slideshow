// start slide show stuff
   
  var slideshow_options = {
    // slide show config options go here.
    slideWidth : 835, // width of the slides
    currentPosition : 0,
    numberOfSlides : 3,
    slides : $(".slide"),
  }

  var slideshow = {

    init : function() {

      // set width of #slideinner to the width of all the slides
      var slideShowWidth = slideshow_options.slideWidth * slideshow_options.numberOfSlides;
      $("#slideInner").css('width', slideShowWidth);

      // hide left arrow when page loads
      $('#previous, #next').hide();

      // autoplay commented out for the time being
      t = setInterval(slideshow.autoPlay, 5000);


      // slideshow animations. Left or Right arrow click
      $('.caret').click(function() {
        slideshow_options.currentPosition = ($(this).attr('id')=='next') ? slideshow_options.currentPosition+1 : slideshow_options.currentPosition-1; 
        slideshow.manageControls(slideshow_options.currentPosition);
        slideshow.moveSlide(slideshow_options.currentPosition);
        slideshow.updateNavIcon(slideshow_options.currentPosition);
        return false;
      });

      // slideshow nav
      $('#hp-tour #slide-nav a').click(function() {
        var navMarker = $(this).attr('id');
        var destinationPosition = parseInt(/\d/.exec(navMarker));
        
        // stop auto play
        clearInterval(t); 
        slideshow_options.currentPosition = destinationPosition-1;
        slideshow.updateNavIcon(slideshow_options.currentPosition);
        slideshow.manageControls(slideshow_options.currentPosition);
        slideshow.moveSlide(slideshow_options.currentPosition);
        return false;
      });

    }, //end init

    manageControls : function(position) {
      // if show on first slide then hide control to see previous slide
      // if show on last slide then hide control to see next slide
      if (position === 0) { 
       $(previous).hide();
      } 
      else {
        $(previous).show();
      }

      // hide right arrow
      if(position === slideshow_options.numberOfSlides-1) { 
        $(next).hide();  
      }
      else {
        $(next).show();
      }
    }, // end manageControls

    updateNavIcon : function(position) {
      // update nav icons
      var targetId = '#slideNumber'+ (parseInt(position) + 1);

      //first remove the indicator for currnetly highlighted 
      $('#slide-nav a.selected').removeClass('selected');
     
      //add indicator as to which slide is selected
      $('#slide-nav').find(targetId).addClass('selected');
    }, // end updateNavIcon

    autoPlay : function() {
      // Slide through 
      if (slideshow_options.currentPosition === 2) {
        slideshow_options.currentPosition = 0;
        slideshow.moveSlide(slideshow_options.currentPosition);
        slideshow.upadateNavIcon(slideshow_options.currentPosition);
      } else {
        slideshow_options.currentPosition += 1;
        slideshow.moveSlide(slideshow_options.currentPosition);
        slideshow.updateNavIcon(slideshow_options.currentPosition);
      }
    }, // end autoPlay

    moveSlide : function(position) {
      // function to actually move the slides by updating left postion.
      $('#slideInner').animate({
        'left' : slideshow_options.slideWidth * (-position)
      })
    } // end moveSlide

  } // end slideshow

  slideshow.init();