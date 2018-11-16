var url = "https://api.dotball.com/api/";
var upcominconfig = {
  margin:24,
  loop:false,
  autoWidth:false,
  items:3,
  dots: false,
  nav: true,
  responsiveClass:true,
      responsive:{
          0:{
              items:1,
              loop:true,
              margin:5,
              autoWidth:false,
              autoHeight: true,
          },
          480:{
              items:1,
              margin:24,
          },
        768:{
          items:2,
          margin:24,
        },
        991:{
          items:3,
          margin:24,
        }
      }

}
var popularconfig = {
  margin:24,
	    loop:false,
	    autoWidth:true,
	    items:4,
	    dots: false,
	    nav: true,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              loop:true,
              margin:5,
              autoWidth:false,
              autoHeight: true,
          },
          480:{
              items:3,
              loop:true
          },
          991:{
              items:4,
              loop:true
          }
      }
}
var liveconfig = {
      loop:true,
	    margin:0,
	    nav:true,
	    items:1,
	    dots: false,
	    nav: true,
}
var $owl =	$('.upcoming-slider').owlCarousel(upcominconfig);
var $popular = $('.popular__carousel').owlCarousel({popularconfig});
var $live = 	$('.live-slider').owlCarousel({liveconfig});
$(function() {	
	$('.tooltipped').tooltip();
  $('.datepicker').datepicker({
    format: "dd/mm/yyyy"
  });
	$('.dotball-navbar__menus').sidenav({
    edge: 'right',
  });

	$('.faqtab__content__block').addClass('tab__collapse');
  $('.faqtab__content__block').first().removeClass('tab__collapse').addClass('show');

  $('.faqtab__li').first().addClass('active');

  $('.faqtab__link').click(function(event) {
    event.preventDefault();

    $('.faqaccordion__subContent').slideUp(300);
    $('.faqaccordion__subHeader').removeClass('active-collapse__block');
    $('.faqaccordion__content').slideUp(500);
    
    $('.faqtab__li').removeClass('active');
    $(this).parent().addClass('active');

    var target = $(this).attr('href');
    $('.faqtab__content__block').fadeOut(0, function() {

      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').removeClass('active-collapse');
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__content').slideUp(500);

    }).removeClass('show').addClass('tab__collapse');
    $(target).fadeIn(600, function() {

      $(this).removeClass('tab__collapse').addClass('show');
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').addClass('active-collapse');
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__content').slideDown(500);
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').children('i').removeClass('mdi-plus').addClass('mdi-minus');

    });


  });

  $('.faqtab__content__block .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').addClass('active-collapse');
  $('.faqtab__content__block .faqaccordion .faqaccordion__block').first().children('.faqaccordion__content').slideDown(500);
  $('.faqtab__content__block .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').children('i').removeClass('mdi-plus').addClass('mdi-minus');

  $('.faqaccordion__header').click(function(event) {
    if ($(this).hasClass('active-collapse')) {
      $(this).removeClass('active-collapse');
    } else {
      $('.faqaccordion__block .faqaccordion__header').removeClass('active-collapse');
      $(this).addClass('active-collapse');
    }

    $('.faqaccordion__content').stop().slideUp(500);
    $(this).next('.faqaccordion__content').stop().slideToggle(500);


    if ($('.faqaccordion__header').hasClass('active-collapse')) {
      $('.faqaccordion__header').children('i').removeClass('mdi-minus').addClass('mdi-plus');
      $(this).children('i').removeClass('mdi-plus').addClass('mdi-minus');
    } else {
      $(this).children('i').removeClass('mdi-minus').addClass('mdi-plus');
    }
  });

  $('.faqaccordion__subContent').stop().slideUp(300);
  $('.faqaccordion__subHeader').click(function(event) {
    $(this).next('.faqaccordion__subContent').stop().slideToggle(500);
    $(this).toggleClass('active-collapse__block');
  });


  Pace.on("start", function(){
      $(".paceDiv").fadeIn(500);
      console.log('sasas');
  });

  Pace.on("done", function(){
      $(".paceDiv").fadeOut(500);
  });

  $('#downloadApp').modal({
    opacity: 0.8,
    onCloseEnd: function() {
      $('.success-message').fadeOut('500', function() {
       $('.downloadApp-modal__formSection').fadeIn(500);
     });
    }
  });
  $('#contactModal').modal({
    opacity: 0.8
  });

  $('.contestpass__table__content').slideUp(300);
  $('.contestpass__table__header').click(function(event) {
    $(this).next('.contestpass__table__content').slideToggle(500);
    $(this).parent().toggleClass('collapse__block');
  });
  
});

$(window).bind("resize", function () {
    if ($(this).width() < 767) {
        $('.scorepoint__section__group__header').click(function(event) {
          $(this).next('.scorepoint__lists').stop().slideToggle(500);
          $(this).toggleClass('active-scorepoint');
          if ($(this).hasClass('active-scorepoint')) {
            $(this).children('.mdi').removeClass('mdi-chevron-down').addClass('mdi-chevron-up');
          } else {
           $(this).children('.mdi').removeClass('mdi-chevron-up').addClass('mdi-chevron-down');
          }
        });

        $('.downloadapp_step-carousel').owlCarousel({
          margin:10,
          loop:false,
          items:1,
          nav: false,
          dots: true
        });
        $('.faqtab__ul').owlCarousel({
          margin:10,
          loop:true,
          autoWidth:true,
          items:4,
          nav: false,
          dots: false
        });
    } else {
       $('.downloadapp_step-carousel').trigger('refresh.owl.carousel');
       $('.faqtab__ul').trigger('refresh.owl.carousel');
    }
}).resize();

function PathLoader(el) {
    this.el = el;
    this.strokeLength = el.getTotalLength();
    this.el.style.strokeDasharray =
    this.el.style.strokeDashoffset = this.strokeLength;
}

PathLoader.prototype._draw = function (val) {
    this.el.style.strokeDashoffset = this.strokeLength * (1 - val);
}

PathLoader.prototype.setProgress = function (val, cb) {
  this._draw(val);
    if(cb && typeof cb === 'function') cb();
}

PathLoader.prototype.setProgressFn = function (fn) {
  if(typeof fn === 'function') fn(this);
}

$('#downloadAppform').submit(function(event) {
  event.preventDefault();
  console.log(event);
  var a = $(this).find('#mobileNumber');
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(a.value == phoneno) {
     return true;
   } else {
     $('.downloadApp-modal__formSection').fadeOut('500', function() {
       $('.success-message').fadeIn(500);
     });
     
      var body = document.body,
          svg = document.querySelector('svg path');

      if(svg !== null) {
          svg = new PathLoader(svg);
          setTimeout(function () {
              document.body.classList.add('active');
              svg.setProgress(1);
          }, 600);
      }
      return false;
     }
});
const emailReg = new RegExp(
	"^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$"
	);
const mobileReg = new RegExp("^[1-9][0-9]{9}$");
// contact modal
$('.contactModal-modal__btn').on("click",(e)=>{
	e.preventDefault();
	const email = $('#contactModal #contactemail').val();
	const name = $('#contactModal #contactname').val();
	const number = $('#contactModal #contactphone').val();
	const query = $('#contactModal #contactmessage').val();
	if(emailReg.test(email)){
		$('#contactModal #contactemail').closest(".input-field").find(".error").addClass('hide')		
	}else {
		$('#contactModal #contactemail').closest(".input-field").find(".error").removeClass('hide')
	}
	if(name.length >=2 ){
		$('#contactModal #contactname').closest(".input-field").find(".error").addClass('hide')		
	}else {
		$('#contactModal #contactname').closest(".input-field").find(".error").removeClass('hide')
	}
	if(mobileReg.test(number)){
		$('#contactModal #contactphone').closest(".input-field").find(".error").addClass('hide')		
	}else {
		$('#contactModal #contactphone').closest(".input-field").find(".error").removeClass('hide')
	}
	if(query.length >= 20){
		$('#contactModal #contactmessage').closest(".input-field").find(".error").addClass('hide')		
	}else {
		$('#contactModal #contactmessage').closest(".input-field").find(".error").removeClass('hide')
	}
	if(emailReg.test(email) && name.length >=2 && mobileReg.test(number) && query.length >= 20){
		$.ajax({
			url: url + "support",
			type: "POST",
			data:{
				"name": name,
				"email": email,
				"subject": "GENERAL QUERIES",
				"description": query,
				"mobile_number": number,
			},
			success: function (response) {
				if (response.code) {
					$('.contactModal-modal__area, .contactModal-modal__text').addClass("hide")
					$('.success-msg').removeClass('hide');				
				}
			}
		});
	}
})
$('.downloadApp__btn.click').on("click",function(e){
	e.preventDefault();
  const number = $('#mobileNumber').val();
  if(mobileReg.test(number)){
		$('#mobileNumber').closest(".input-field").find(".error").addClass('hide')		
	}else {
		$('#mobileNumber').closest(".input-field").find(".error").removeClass('hide')
	}
  $.ajax({
    url: url + "/users/send-message",
    type: "POST",
    data:{
      "mobile_number":number
    },
    success: function (response) {
      if (response.code) {
        $('#mobileNumber').val("");
      }
    }
  });
})

$(document).ready(function(){
  $('.t20MobileTabs, .odiMobileTabs, .testMobileTabs').tabs();

  $('.scorepoint__systemBlock').click(function(event) {
    event.preventDefault();
    var tt = $(this).attr('href');
    $('.scorepoint__systemBlock').parent().removeClass('active');
    $(this).parent().addClass('active');
    
    $('.scorepoint__sectionArea').fadeOut(600);
    $(tt).fadeIn(600, function() {
      $('html, body').animate({
        scrollTop: $(tt).offset().top - 50
      }, 1000);
    });;

  });
});