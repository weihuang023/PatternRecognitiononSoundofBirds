function bbFancyBoxLinks(selector, fancyBoxOpts) {
	var fancy_links = $(selector + ',' + selector + ' a[href]').filter('a[href]').filter(':not(.no_fancybox_links)');
	if (fancy_links.length) {
		fancy_links.each(function() {
			var r = $(this).attr('href'),
				x = r.slice(-4).toLowerCase(),
				t = 'iframe',
				html5opt, opt,
				html5opts = $(this).data(),
				bbFancyBoxLinksDefaults = bbFancyBoxLinksDefaults || {},
				otherOpts = bbFancyBoxLinksDefaults || {},
				opts = $.extend({}, otherOpts, fancyBoxOpts);

			//build options object with html5 options set in DOM object
			for (opt in $.fn.fancybox.defaults) {
				if ($.fn.fancybox.defaults.hasOwnProperty(opt)) {
					html5opt = html5opts['fancybox' + opt.toLowerCase()];
					if (html5opt !== undefined) { //is this necessary?
						opts[opt] = html5opt;
					}
				}
			}

			t = x === '.jpg' || x === '.png' || x === '.gif' ? 'image' : t;
			t = x === '.swf' ? 'swf' : t;
			if (r.indexOf('#') === 0) {
				t = ''; //not 'inline', instead let it guess the type, this way works better with older fancybox versions
				$(r).css('display', 'none').wrapInner($('<div>').addClass('fancybox_links_wrapper'));
				$(this).attr('href', r + ' .fancybox_links_wrapper');
			}
			opts.type = opts.type || t;
			opts.orig = opts.orig || $(this);
			$(this).fancybox(opts);
		});
	}
};