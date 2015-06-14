(function($) {

	skel
		.breakpoints({
			wide: '(max-width: 1680px)',
			normal: '(max-width: 1280px)',
			narrow:	'(max-width: 980px)',
			narrower: '(max-width: 840px)',
			mobile: '(max-width: 640px)'
		});

	$(function() {

		var $body = $('body'),
			$window = $(window),
			$header = $('#header'),
			$main = $('#main'),
			$main_header = $main.children('header'),
			$banner = $('#banner'),
			$nav = $('#nav');

		// Placeholder fix (IE<10).
		// If IE<10, use formerize to add support for the "placeholder" attribute.
			if (skel.vars.IEVersion < 10) {

				// formerize v1.0 | (c) n33 | n33.co @n33co | MIT
					$.fn.formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };

				// Apply formerize all forms.
					$('form').formerize();

			}

		// Re-enable animations.
			$body.addClass('is-loading');

			$window.load(function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Panels.
			var $panels = $('.panel');

			$body
				.on('click touchend', function(event) {
					$panels.removeClass('active');
				});

			$panels.each(function() {

				var $panel = $(this),
					$toggle = $('#' + $panel.attr('id') + '-toggle');

				$panel
					.on('click touchend', function(event) {
						event.stopPropagation();
					});

				$panel.find('.closer')
					.on('click touchend', function(event) {

						event.stopPropagation();
						event.preventDefault();

						$panel.removeClass('active');

					});

				$toggle
					.on('click touchend', function(event) {

						event.stopPropagation();
						event.preventDefault();

						$panels.not($panel).removeClass('active');
						$panel.toggleClass('active');

					});

			});

		// Nav.
			if ($nav.length > 0) {

				if (!skel.vars.isTouch)
					$nav
						.css('overflow', 'hidden')
						.on('DOMMouseScroll mousewheel', function(e) {

							var delta = (e.originalEvent.wheelDelta || e.originalEvent.detail * -1),
								scrollLeft = $nav.scrollLeft();

							e.preventDefault();
							e.stopPropagation();

							if (delta > 0)
								delta = 5;
							else
								delta = -5;

							scrollLeft -= delta;

							$nav.scrollLeft(scrollLeft);

							return false;

						});

			}

		// Cover.
			if ($body.hasClass('with-cover')) {
				if (skel.vars.isTouch || skel.vars.IEVersion < 9)
					$body.addClass('touch');
				else {
					$header.addClass('transparent');

					(function(){var e="scrollwatch",t="length",n=null,r="top",i="rangeMin",s="rangeMax",o="scrollgress",u="data",a="scrollwatch-state",f=!1,l="anchor",c="unscrollwatch",h="unscrollgress",p="removeData",d="element",v="-id",m="scroll.",g="height",y="scrollTop",b="center",w="bottom",E=$(window),S=$(document),x=1e3;jQuery.fn[e]=function(c){var h,p,d,v;if(this[t]>1){for(h=0;h<this[t];h++)$(this[h])[e](c);return this}return p=jQuery.extend({range:.5,rangeMin:n,rangeMax:n,anchor:r,init:n,on:n,off:n,delay:0},c),p[i]===n&&(p[i]=-1*p.range),p[s]===n&&(p[s]=p.range),d=$(this),p.init&&p.init(d),d[u](a,-1)[o](function(e){window.clearTimeout(v),v=window.setTimeout(function(){var t,n,r=parseInt(d[u](a));if(r==0||r==-1){t=p[i]===f||e>=p[i],n=p[s]===f||e<=p[s];if(t&&n){d[u](a,1),p.on&&p.on(d);return}}if(r==1||r==-1){t=p[i]!==f&&e<p[i],n=p[s]!==f&&e>p[s];if(t||n){d[u](a,0),p.off&&p.off(d);return}}},p.delay)},{anchor:p[l]},e),d},jQuery.fn[c]=function(){var n,r;if(this[t]>1){for(n=0;n<this[t];n++)$(this[n])[c]();return this}return r=$(this),r[p](a,0)[h](e),r},jQuery.fn[o]=function(e,n,i){var s,a,f,c,h;if(this[t]>1){for(s=0;s<this[t];s++)$(this[s])[o](e,n,i);return this}return i||(i=o),a=jQuery.extend({anchor:r,direction:"both",scope:d,easing:0},n),f=$(this),f[u](i+v)||f[u](i+v,x++),c=f[u](i+v),h=m+i+"-"+c,E.off(h).on(h,function(){var t,n=f.offset()[r],i=f.outerHeight(),s=S[g]();switch(a.scope){default:case d:switch(a[l]){default:case r:t=(n-E[y]())/i*-1;break;case b:t=(n-E[y]()-(E[g]()-i)/2)/i*-1;break;case w:t=(n-E[y]()-(E[g]()-i))/i*-1}break;case"window":switch(a[l]){default:case r:t=(n-E[y]())/E[g]()*-1;break;case b:t=(n-E[y]()-(E[g]()-i)/2)/E[g]()*-1;break;case w:t=(n-E[y]()-(E[g]()-i))/E[g]()*-1}}a.direction=="forwards"?t=Math.max(0,t):a.direction=="backwards"&&(t=Math.min(0,t)),t>0?t=Math.max(0,t-a.easing/100):t<0&&(t=Math.min(0,t+a.easing/100)),e(t,f)}).trigger("scroll"),f},jQuery.fn[h]=function(e){var n,r,i,s;if(this[t]>1){for(n=0;n<this[t];n++)$(this[n])[h](e);return this}return e||(e=o),r=$(this),r[u](e+v)?(i=r[u](e+v),s=m+e+"-"+i,E.off(s),r[p](e+v),r):r}})();

					$window.on('load', function() {

						// Scrollwatch.
							$main_header.scrollwatch({
								delay:		0,
								rangeMin:	false,
								rangeMax:	0.3,
								anchor:		'top',
								on:			function() { $header.addClass('transparent'); },
								off:		function() { $header.removeClass('transparent'); }
							});

					});
				}
			}

	});

})(jQuery);