$(function () {
  clickOutsideMenu();

  // menu
  $('.js-open-menu').on('click', function(e) {
    e.preventDefault();
    openMenu();
  });

  $('.js-close-menu').on('click', function(e) {
    e.preventDefault();
    closeMenu();
  });

	// menu fixo ao scrollar
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 30) {
      $('.nav').addClass('nav--scrolling');
      $('.nav__logo .logo').removeClass('logo--white');
    } else{
    	$('.nav').removeClass('nav--scrolling');
    	$('.nav__logo .logo').addClass('logo--white');
    }
  });

  // slider baner
  $('.js-banner-slider').slick({
    arrows: true,
    prevArrow: '<button type="button" class="depo__arrow depo__arrow--prev"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.5 95" style="enable-background:new 0 0 54.5 95;" xml:space="preserve"><g><path fill="#145f93" d="M8.7,1.5C7.7,0.5,6.5,0,5.1,0S2.5,0.6,1.5,1.5C0.5,2.5,0,3.7,0,5.1s0.5,2.6,1.5,3.6l38.9,38.8L1.5,86.3 c-1,1-1.5,2.2-1.5,3.6s0.5,2.6,1.5,3.6S3.7,95,5,95c1.2,0,2.5-0.5,3.5-1.4l46-46L8.7,1.5z"/></g></svg></button>',
    nextArrow: '<button type="button" class="depo__arrow depo__arrow--next"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.5 95" style="enable-background:new 0 0 54.5 95;" xml:space="preserve"><g><path fill="#145f93" d="M8.7,1.5C7.7,0.5,6.5,0,5.1,0S2.5,0.6,1.5,1.5C0.5,2.5,0,3.7,0,5.1s0.5,2.6,1.5,3.6l38.9,38.8L1.5,86.3 c-1,1-1.5,2.2-1.5,3.6s0.5,2.6,1.5,3.6S3.7,95,5,95c1.2,0,2.5-0.5,3.5-1.4l46-46L8.7,1.5z"/></g></svg></button>',
  });

  // SCROLLBAR
  if ($('.js-scrollbar').length > 0) {
    const ps = new PerfectScrollbar('.js-scrollbar');
  }

  // SMOOTH SCROLL
  $('.js-scroll').on('click', function(event) {
    smoothScroll();
  });

  $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

  $('.accordion__trigger').click(function(e) {
    console.log($(this));
    var dropDown = $(this).siblings('.accordion__content');
    console.log(dropDown);

    $(this).closest('.accordion').find('.accordion__content').not(dropDown).slideUp();

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).closest('.accordion').find('a.active').removeClass('active');
        $(this).addClass('active');
    }

    dropDown.stop(false, true).slideToggle();

    e.preventDefault();
  });
});

function closeMenu() {
  $('.nav').removeClass('nav--open');
  $('.js-trigger-nav').removeClass('menu-icon--open');
  $('.menu__item').removeClass('menu__item--is-selected');
  $('body').removeClass('overflow-hidden');
}

function openMenu() {
  $('.js-trigger-nav').addClass('menu-icon--open');
  $('.nav').addClass('nav--open');
  $('body').addClass('overflow-hidden');
}

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function checkWindowWidth() {
  var w = viewport().width;
  var size = '';
  if(w > 991){
    size = 'desktop';
  } else{
    size = 'mobile';
  }

  return size;
}

function clickOutsideMenu() {
  $(document).on('mouseup', function(e) {
    var elem = $('.nav');

    if (!elem.is(e.target) && elem.has(e.target).length === 0) {
      closeMenu();
    }
  });
}

function smoothScroll() {
	if (this.hash !== '') {
		event.preventDefault();
		var hash = this.hash;

		$('html, body').animate({
			scrollTop: $(hash).offset().top - 100
		}, 800, function(){

			// Add hash (#) to URL when done scrolling (default click behavior)
			//window.location.hash = hash;
		});
	}
}
