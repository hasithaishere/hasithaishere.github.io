(function($)
{
	"use strict";
	
	//========================= preloader ================
	$(window).on('load', function() {
		preloader();
	})
	
	$(document).on('ready', function () {
		$(".navbar-nav li a").on("click",function(event){
			event.preventDefault();
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');
			var target = $(this).attr("href");
			$("html, body").stop().animate({
			   scrollTop: $(target).offset().top
			}, 600, 'easeInOutExpo');
		});
		
		// Animation
		 if($('.wow').length){
			var wow = new WOW(
			  {
				boxClass:     'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset:       150,          // distance to the element when triggering the animation (default is 0)
				mobile:       true,       // trigger animations on mobile devices (default is true)
				live:         true       // act on asynchronously loaded content (default is true)
			  }
			);
			wow.init();
		}
		
		// Projects Filter
		$('.portfolio_items').mixItUp();
		
		// Fancybox
		$('a.fancybox').fancybox();
		
		$('#navbar').each(function(){
			$(this).jScrollPane({
				showArrows: $(this).is('.arrow')
			});
			var api = $(this).data('jsp');
			var throttleTimeout;
			$(window).on('resize',function(){
				if (!throttleTimeout) {
					throttleTimeout = setTimeout(function(){
						api.reinitialise();
						throttleTimeout = null;
					},50);
				}
			});
		});
		
		// Sidebar Opener
		$('#menu .mobile-menu-opener').on('click', function(e) {
			e.preventDefault();
			var div = $('#menu');
			if (div.css('left') === '-220px') {
				$('#menu').animate({
					left: '0px'
				}); 
			} else {
				$('#menu').animate({
					left: '-220px'
				});
			}
		});
		
		$('#navbar li a').on('click', function(e) {
			e.preventDefault();
			$('#menu').animate({
				left: '-220px'
			});
			
		});
		$('.content-wrapper').on('click', function(e) {
			//e.preventDefault();
			$('#menu').animate({
				left: '-220px'
			});
			
		});
		
		//Contact Map
		var mapInfo = {"lat":"23.800446", "lon":"90.349832"}; //Change a map coordinate here!
		try {
			$('.map').gmap3({
				action: 'addMarker',
				latLng: [mapInfo.lat, mapInfo.lon],
				map:{
					center: [mapInfo.lat, mapInfo.lon],
					zoom: 15
					},
				},
				{action: 'setOptions', args:[{scrollwheel:false}]}
			);
		} catch(err) {

		}
		
		// Counter Up 
		$('.counter').counterUp({
			delay: 10,
			time: 2000
		});
		
		// Back to top
		$(".back-top").hide();
		
		$('.back-top a').on('click', function(event) {
			$('body,html').animate({scrollTop:0},800);
			return false;
		});
		
	});
	
	$(window).on('scroll', function() {
		// Back to top							
		if($(this).scrollTop()>150){
			$('.back-top').fadeIn();
		}
		else{
			$('.back-top').fadeOut();
		}
		
		// Progressbar 
		$(".single-progressbar").each(function() {
			var base = $(this);
			var windowHeight = $(window).height();
			var itemPos = base.offset().top;
			var scrollpos = $(window).scrollTop() + windowHeight - 100;
			if (itemPos <= scrollpos) {
				var auptcoun = base.find(".progress-bar").attr("aria-valuenow");
				base.find(".progress-bar").css({
					"width": auptcoun + "%"
				});
				var str = base.find(".skill-per").text();
				var res = str.replace("%", "");
				if (res === 0) {
					$({
						countNumber: 0
					}).animate({
						countNumber: auptcoun
					}, {
						duration: 1500,
						easing: 'linear',
						step: function() {
							base.find(".skill-per").text(Math.ceil(this.countNumber) + "%");
						}
					});
				}
			}
		});	
		
	});
	
	//============= Preload ============ 
	function preloader(){
		$(".preloaderimg").fadeOut();
		$(".preloader").delay(200).fadeOut("slow").delay(200, function(){
			$(this).remove();
		});
	}
	
})(jQuery);	