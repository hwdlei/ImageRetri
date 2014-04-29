(function()
{
	this.Toplist = (function()
	{
		function Toplist()
		{
			WB.load_thumb_binds();

			// timespan select
			$('.ts-change .radio').bind('change', function()
			{
				var s = document.location.search;
				var p = '';

				if(/&ts=[a-zA-Z0-9]+/g.test(s) || /\?ts=[a-zA-Z0-9]+/g.test(s))
				{
					p =  document.location.search.replace(/ts=[a-zA-Z0-9]+/g, '');
					window.location.href = 'toplist' + p + 'ts=' + $(this).val();
				}
				else
				{
					if(/\?/g.test(s))
					{
						window.location.href = 'toplist' + document.location.search + '&ts=' + $(this).val();
					}
					else
					{
						window.location.href = 'toplist' + '?ts=' + $(this).val();
					}
				}
			});
		}

		return Toplist;
	})();

	// COLL RATINGS
	this.Rate = (function()
	{
		function Rate()
		{
			$('.rating').on('click', '.spr-hand-up, .spr-hand-down', $.proxy(this.vote_click, this));
		}

		Rate.prototype.vote_click = function(e) 
		{
			var _self = this;
			var value = $(e.target).hasClass('spr-hand-down') ? 'down' : 'up';
			var coll_id = parseInt($(e.target).parent().parent().attr('coll_id'));

			// show preloader?

			// ajax call
			$.ajax({
				type: "GET", 
				timeout: 15000,
				url: base_url + "collection/rate_coll/" + coll_id + "/" + value,
				dataType: 'json',
				success: function(data)
				{
					if(data.status == 1)
					{
						$('.rate'+coll_id+' .num').text(data.rating);
					}
					else
					{
						Growl.show('alert', data.error);
					}
				}
			});
		};

		return Rate;
	})();

	// INFINITE SCROLL
	this.Infscroll = (function()
	{
		function Infscroll()
		{
			var _self = this;

			this.ON = true;
			this.threshold = 1000;
			this.catdir = {1: 'manga-anime', 2: 'rozne', 3: 'high-resolution'};
			this.sec2sec = {'wallpapers': '#thumbs', 'collections': '#collections'};
			this.new_s = opt.thpp;
			this.wh = $(window).height();

			$(window).scroll(function() 
			{
				_self.scroll();
			});

			$('#wrap').on('click', '.goup', function()
			{
				$(document).scrollTo({top: 0, left: '0px'}, 0);
			});
		}

		Infscroll.prototype.scroll = function()
		{
			if( ! this.ON)
				return;

			var _self = this;

			if($(window).scrollTop() >= ($(document).height() - this.wh - this.threshold))
			{
				this.ON = false;

				$.ajax({
					type: "GET", 
					timeout: 15000,
					url: base_url + "toplist/index/" + _self.new_s + document.location.search,
					success: function(data, status, xhr)
					{
						if(opt.coll_view != 'extended')
						{
							var line_break = '<div class="linebreak"><div class="tit">' + parseInt((_self.new_s / opt.thpp) + 1) + '</div><div class="goup"></div><div class="line"></div></div>';
							$(_self.sec2sec[opt.section]).append(line_break);
						}

						var frag = document.createDocumentFragment(),
					    tmp = document.createElement('body'), child;

						tmp.innerHTML = data;
						while(child = tmp.firstChild)
						{
							frag.appendChild(child);
						}

						delete tmp, child;

						$(_self.sec2sec[opt.section]).append(frag);
						delete frag;
						
						if(xhr.getResponseHeader('WBcontent') == '0')
						{
							_self.ON = false;
						}
						else
							_self.ON = true;

						WB.lazyload();

						// calculate new s
						_self.new_s = _self.new_s + opt.thpp;
					}
				});
			}
		};

		return Infscroll;
	})();

}).call(this);

var Toplist = new Toplist();

if(opt.coll_view == 'extended')
{
	var Rate = new Rate();
}

// tags
try { var Tag = new Tag(); }catch(e) {}

// infscroll
if(opt.pagination == 1)
	var Infscroll = new Infscroll();