jQuery(function($){
	$.notif = function (t) {
        $("body").notif(t);
    };
	$.fn.notif = function( options ){
		var settings = {
			html : '<div class="notification animated flipInX {{ #cls }} {{ cls }} {{ /cls }} {{^cls}} default {{/cls}}">\
				<div class="left">\
					<span class="{{icons}}"></span>\
				</div>\
				<div class="right">\
					<h2>{{title}}</h2>\
					<p>\
						{{content}}\
					</p>\
				</div>\
			</div>',
			timeout : 3000
		};
		if(options.cls == "success"){
			options.icons = 'icon-checkmark-circle';
		}
		if(options.cls == "error"){
			options.icons = 'icon-cancel-circle';
		}
		var options = $.extend(settings,options);

		return this.each(function (){
			var el = $(this);
			var notifs = $('.notifications',el);// Notification wrap
			var notif  = $(Mustache.render(options.html,options));
			if(notifs.length == 0){
				notifs = $('<div class="notifications"/>');
				el.append(notifs);
			}
			notifs.append(notif);

			notif.click(function(event){
				event.preventDefault();
				notif.addClass('fadeOutRight').delay(300).slideUp(300, function(){
					notif.remove();
				});
			});
			setTimeout(function(){
				notif.trigger('click');
			},options.timeout);
		});
	};
	

});
