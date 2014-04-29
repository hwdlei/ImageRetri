yepnope(
[
    {
        test: opt.loggedin,
        yep: opt.path['js'] + 'users/us.js'
    },
    {
        load: opt.path['js'] + 'areas/' + opt.area + '.js'
    }
]);

// Application
(function()
{
	this.WB = (function()
	{
		// init WB
		function WB()
		{
			// variables
			this.own_areas = {'search': true, 'toplist': true, 'random': true};
			this.$sort_form = $('.sort_form');
			this.search_area_visible = false;
			this.qopt = null;
			//this.$filttip = $('.filt-tips');
			//this.wh = $(window).height();

			this.select();

			var _self = this;

			// Lazy load thumbs
			this.lazyload();

			// binds
			$(document).bind('mousedown', $.proxy(this.hide_floats, this));
			$('.showsearch').bind('click', $.proxy(this.show_search, this));
			//$('#filters').on('mouseenter mouseleave', '.form, .fmulticheck', $.proxy(this.filttips, this));

			$('.searchbar #query').bind('keypress', function(e)
			{
				if(e.keyCode == 13)
				{
					_self.$sort_form.submit();
				}
			});

			$('#filters .refresh').bind('click', function()
			{
				console.log(_self.own_areas);
				if(!_self.own_areas.hasOwnProperty(opt.area))
				{
					_self.default_search = true;
				}

				_self.$sort_form.submit();
			});

			$('.sort_form').bind('submit', function(e)
			{
				e.preventDefault();

				var fields = $('.sort_form').serializeArray();

				var action = [];
				var board = '';
				var purity = [];
				var aspect = [];

				for(f in fields)
				{
					switch(fields[f].name)
					{
						// q
						case 'query': 
							//if(opt.area == 'search')
								action.push('q=' + fields[f].value); 
						break;

						// order
						case 'ord': 
							//if(opt.area == 'search')
								action.push('order=' + fields[f].value);
						break;
						case 'order_mode': 
							//if(opt.area == 'search')
								action.push('order_mode=' + fields[f].value);
						break;

						// boards
						case 'board_wg': board += '2'; break;
						case 'board_w': board += '1'; break;
						case 'board_hr': board += '3'; break;

						// purity
						case 'purity_sfw': purity[0] = true; break;
						case 'purity_sketchy': purity[2] = true; break;
						case 'purity_nsfw': purity[1] = true; break;

						// aspect
						case 'aspect[1_33]': aspect.push('1.33'); break;
						case 'aspect[1_25]': aspect.push('1.25'); break;
						case 'aspect[1_77]': aspect.push('1.77'); break;
						case 'aspect[1_60]': aspect.push('1.60'); break;
						case 'aspect[1_70]': aspect.push('1.70'); break;
						case 'aspect[2_50]': aspect.push('2.50'); break;
						case 'aspect[3_20]': aspect.push('3.20'); break;
						case 'aspect[1_1]': aspect.push('1.1'); break;
						case 'aspect[1_01]': aspect.push('1.01'); break;
						case 'aspect[0_99]': aspect.push('0.99'); break;
						case 'aspect[0]':
						case 'aspect[0_00]': aspect.push('0.00'); break;

						// other
						case 'res_opt': action.push('res_opt=' + fields[f].value); break;
						case 'custom_res':
						case 'res': action.push('res=' + fields[f].value); break;
						case 'custom_asp': aspect.push(fields[f].value); break;
						case 'thpp': action.push('thpp=' + fields[f].value); break;

					}
				}

				action.push('purity=' + (purity[0] ? '1' : '0') + (purity[2] ? '1' : '0') + (purity[1] ? '1' : '0'));
				action.push('board=' + board);
				action.push('aspect=' + encodeURIComponent(aspect.join('+')));

				var q = $('#query').val();
				var color_val = $('.colortab').val()
				var color = color_val.charAt(0) == '#' ? color_val.substring(1) : color_val;
				delete color_val;
				
				if(!_self.own_areas.hasOwnProperty(opt.area))
				{
					var action = 'search?q='+q+'&color='+color+'&section=wallpapers&'+(action.join('&'));
				}
				else
				{
					switch(opt.area)
					{
						case'toplist':
							if(_self.search_area_visible)
							{
								var action = 'search?q='+q+'&color='+color+'&section=wallpapers&'+(action.join('&'));
							}
							else
							{
								var ts = $('input[name="ts"]:checked').val();
								var action = 'toplist?section='+opt.section+'&'+(action.join('&'))+'&ts='+ts;
							}

							break;
						case'random':
							if(_self.search_area_visible)
							{
								var action = 'search?q='+q+'&color='+color+'&section=wallpapers&'+(action.join('&'));
							}
							else
							{
								var action = 'random?section='+opt.section+'&'+(action.join('&'));
							}

							break;
						case'search':
							var action = 'search?q='+q+'&color='+color+'&section=wallpapers&'+(action.join('&'));

							break;
					}
				}

				window.location.href = action;
			});
		};

		WB.prototype.lazyload = function()
		{
			$('.lazyGO').unveil();
		};

		WB.prototype.load_thumb_binds = function()
		{
			$('#wrap').on('click', '.th_purity', function()
			{
				var id = $(this).attr('data-id');
				var $flag = $(this).children('.spr');

				if($(this).hasClass('active'))
				{
					$('#thumb'+id+' .opt-purity').remove();
					$('.thumbnail .active').removeClass('active');
				}
				else
				{
					$('#thumb'+id+' .tagger').addClass('hidden');
					$('.thumbnail .opt-purity').remove();

					if($flag.hasClass('spr-small-flag0'))
						$('#thumb'+id).prepend('<ul class="opt-purity" data-id="'+id+'"><li class="opt"><a href="javascript:;" class="opt-a sketchy">SKETCHY</a></li><li class="opt"><a href="javascript:;" class="opt-a nsfw">NSFW</a></li></ul>');
					else if($flag.hasClass('spr-small-flag2'))
						$('#thumb'+id).prepend('<ul class="opt-purity" data-id="'+id+'"><li class="opt"><a href="javascript:;" class="opt-a sfw">CLEAN</a></li><li class="opt"><a href="javascript:;" class="opt-a nsfw">NSFW</a></li></ul>');
					else if($flag.hasClass('spr-small-flag1'))
						$('#thumb'+id).prepend('<ul class="opt-purity" data-id="'+id+'"><li class="opt"><a href="javascript:;" class="opt-a sfw">CLEAN</a></li><li class="opt"><a href="javascript:;" class="opt-a sketchy">SKETCHY</a></li></ul>');

					$('.thumbnail .active').removeClass('active');
					$(this).addClass('active');
				}
					
			});

			$('#wrap').on('click', '.opt-purity .opt-a', function()
			{
				var $parent = $(this).parent();
				var id = parseInt($(this).parent().parent().attr('data-id'));
				var $thumb = $('#thumb'+id);
				var value = 0;
				
				if($(this).hasClass('nsfw'))
					value = 1;
				else if($(this).hasClass('sketchy'))
					value = 2;
				else if($(this).hasClass('sfw'))
					value = 0;
					
				$('#thumb'+id+' .opt-purity').remove();
				$('#thumb'+id+' .active').removeClass('active');
				$thumb.prepend('<div class="loader"><img src="'+opt.path['images']+'loader-circle.gif" class="img"></div>');
					
				$.ajax({
					type: "GET", 
					url: base_url + "wallpaper/purity/" + id + "/" + value,
					dataType: 'json',
					success: function(m)
					{
						if(m.status == 1)
						{
							$('#thumb'+id+' .loader').remove();
							
							switch(m.purity)
							{
								case 0:
									$thumb
										.removeClass('purity-2')
										.removeClass('purity-1')
										.find('.th_purity')
										.html('<span class="spr spr-small-flag0"></span>');
									break;
								case 1:
									$thumb
										.removeClass('purity-2')
										.addClass('purity-1')
										.find('.th_purity')
										.html('<span class="spr spr-small-flag1"></span>');
									break;
								case 2:
									$thumb
										.removeClass('purity-1')
										.addClass('purity-2')
										.find('.th_purity')
										.html('<span class="spr spr-small-flag2"></span>');
									break;
							}
						}
						else
						{
							$('#thumb'+id+' .loader').remove();

							Growl.show('error', m.error);
						}
					}
				});
			});

			// M4Del
			$(document).on('click', '.th_del', function()
			{
				var id = $(this).attr('data-id');
				var $thumb = $('#thumb'+id);
				
				$.ajax({
					type: "GET", 
					url: base_url + "wallpaper/delete/" + id + "/rep",
					success: function(data)
					{
						Modal.open('350px', 'top', data);
					}
				});
			});
		};

		WB.prototype.show_search = function()
		{
			var $bar = $('#subtop .logomenu .menu .searchbar');
		
			// show
			if($bar.hasClass('hidden'))
			{
				$bar.removeClass('hidden').css('display', 'block').animate({'width': '200px'}, 200, function() 
				{ 
					$('#filters').animate({'top': '0px'}, 200).css({'z-index':'auto', 'position': 'relative'}); 
					$('#query').focus();
				});

				this.search_area_visible = true;
			}
			else
			// hide
			{
				$bar.animate({'width': '1px'}, 200, function() 
				{ 
					$bar.addClass('hidden').css('display', 'none'); 
					$('#filters').animate({'top': '-44px'}, 200).css({'z-index':'-1', 'position': 'absolute'}); 
				});

				this.search_area_visible = false;

				return false;
			}
		};

		WB.prototype.hide_floats = function(e)
		{
			var target = (e && e.target) || (event && event.srcElement);

			if($(target).hasClass('eS'))
				e.stopPropagation();
			else
			{
				$('.form .options').addClass('hidden');
				try { Us.hide_useropts(); }catch(e){}
			}
		};

		WB.prototype.select = function()
		{
			$('.form .custom .fbutton').bind('click', function(e)
			{
				var $opt = $(this).parents('.options');
				var $custom = $(this).parents('.custom');
				var w = $(this).siblings('.input-w').val();
				var h = $(this).siblings('.input-h').val();
				var cust_type = $custom.attr('type');
				var ratio = 0;

				if(cust_type == 'res')
				{
					$opt.find('input:checked').removeAttr('checked');
					$(this).parents('.form').find('.fselect-header').text(w + 'x' + h);

					if($custom.find('.inp_custom').length == 0)
						$custom.append('<input type="hidden" class="inp_custom" name="custom_res" value="'+w + 'x' + h+'">');
					else
						$custom.find('.inp_custom').val(w + 'x' + h);
				}
				else
				{
					try { ratio = (Math.round(w/h*100)/100) ? (Math.round(w/h*100)/100) : 0; }catch(e) { }
					
					if(ratio > 0)
					{
						$opt.find('input:checked').removeAttr('checked');
						$(this).parents('.form').find('.fselect-header').text(ratio + ':1');

						if($custom.find('.inp_custom').length == 0)
							$custom.append('<input type="hidden" class="inp_custom" name="custom_asp" value="'+ratio+'">');
						else
							$custom.find('.inp_custom').val(ratio);
					}
				}

				$opt.addClass('hidden');
			});
			
			$('.form .custom .input-w, .form .custom .input-h').bind('keypress', function(e)
			{
				if(e.keyCode == 13)
				{
					e.preventDefault();
					return false;
				}
			});

			$('.fselect').bind('click', function(e)
			{
				var $opt = $(this).children('.options');
				var $header = $(this).find('.fselect-header');
				var target = (e && e.target) || (event && event.srcElement);
				
				$('.form').not(this).find('.options').addClass('hidden');
				
				if($(target).hasClass('fheader'))
				{
					$opt.toggleClass('hidden');
				}
			});

			$('.fselect .label, .fresolution .label, .forder .label').bind('click', function()
			{
				var for_inp = $(this).attr('for');
				var $inp = $('#'+for_inp);
				var $head = $(this).parents('.form').find('.fselect-header');
				var checked = $inp.is(':checked');
				var type = $inp.attr('type');

				if(type == 'radio')
				{
					$head.text($(this).text());
					$('.form .options').addClass('hidden');
				}
				else
				{
					if($(this).hasClass('setall'))
					{
						$head.text('All');
						$(this).siblings('input:checked').prop('checked', false);
					}
					else
					{
						$(this).siblings('.checkall').prop('checked', false);

						var sel_num = $(this).siblings('input:checked').length + (checked ? -1 : 1);

						if(sel_num == 0)
						{
							$head.text('All');
						}
						else if(sel_num > 1)
						{
							$head.text('multi');
						}
						else
						{
							$head.text($(this).text());
						}
					}
				}

				$(this).parents('.form').find('.inp_custom').remove();
			});

			$('.fresolution .type .type-a, .forder .type .type-a').bind('click', function(e)
			{
				var fvalue = $(this).attr('fvalue');
				var fvalue_rev = {'eqeq': 'gteq', 'gteq': 'eqeq', 'asc': 'desc', 'desc': 'asc'};

				$(this).before($(this).next());
				
				$(this).parent().siblings('input').attr('value', fvalue_rev[fvalue]);
			});
		};

		WB.prototype.filttips = function(e)
		{
			var $target = $((e && e.currentTarget) || (event && event.srcElement));
			var off = $target.offset();

			switch(e.type)
			{
				case 'mouseenter':
					this.$filttip
						.text($target.attr('title'))
						.css('left', off.left)
						.addClass('show');
					break;

				case 'mouseleave':
					this.$filttip.removeClass('show');
					break;
			}
		};

		return WB;

	})();

	// TAGGING
	this.Tag = (function()
	{
		function Tag()
		{
			var _self = this;
			var id = 0;

			this.ac_loaded = false;
			this.aj = null;
			this.query = '';
			this.timeout = null;
			this.$thumb = undefined;
			this.$highl = undefined;
			this.$input = undefined;

			$('#wrap').on('click', '.th_tagit', function()
			{
				id = $(this).attr('data-id');
				_self.$thumb = $('#thumb'+id);

				var taglist = _self.$thumb.attr('data-tags');
				var $taglist = $('#thumb'+id+' .taglist');
				_self.$input = $('#thumb'+id+' .tagger .taginput');

				if($(this).hasClass('active'))
				{
					$('#thumb'+id+' .tagger').addClass('hidden');
					$(this).removeClass('active');
				}
				else
				{
					$('.thumbnail .opt-purity').remove();
					$('.thumbnail .tagger').addClass('hidden');
					$('#thumb'+id+' .tagger').removeClass('hidden');

					// generate taglist
					if($taglist.children().length == 0 && taglist != '')
					{
						var tagsrow = taglist.split('||');
						var tagslen = tagsrow.length;
						var buf = [];

						for(i = 0; i < tagslen; i++)
						{
							var row = tagsrow[i].split('|');
							buf.push('<li class="row tag tag_'+row[1]+' clr"><div class="tag-wrap"><span class="icn">&#xe70c;</span><a href="'+base_url+'search?tag='+row[1]+'" title="'+row[0]+'" class="tag-a pur'+row[2]+'">'+row[0]+'</a><div class="opts"><a href="javascript:;" class="tag-x" tid="'+row[1]+'"><span class="spr spr-tag-x"></span></a><a href="'+ base_url +'tags/info/'+row[1]+'" class="tag-stats"><span class="spr spr-tag-stats"></span></a></div></div></li>');

						}

						$('#thumb'+id+' .tagger .taglist').append(buf.join(''));
					}
					else
						$('#thumb'+id+' .tagger .taglist').append('<li class="empty"></li>');

					// scroll with mousewheel
					$taglist.bind('mousewheel', function(e, delta)
					{
						if(delta < 0)
							$taglist.scrollTo({top: '+=184px', left: '0px'}, 200);
						else
							$taglist.scrollTo({top: '-=184px', left: '0px'}, 200);
						
						return false;
					});
					
					if(opt.loggedin)
					{
						_self.$input.focus();

						if(!_self.ac_loaded)
							_self.autocomplete(_self.$input);
					}
					else
					{
						_self.$input.remove();
					}

					$('.thumbnail .active').removeClass('active');
					$(this).addClass('active');
				}
				
			});

			$('#wrap').on('click', '.taglist .tag-x', function() 
			{
				var $this = $(this);
				var tid = parseInt($this.attr('tid'));

				$.ajax(
				{
					type: "GET",
					url: "index.php/wallpaper/delete_tagset/" + id + "/" + tid,
					dataType: 'json',
					success: function(m) 
					{
						if(m.status == 1)
						{
							$('#thumb'+id+' .taglist .tag_'+tid).remove();
						}
						else
							Growl.show('error', m.error);
					}
				});
			});
		}

		Tag.prototype._trim = function(str, chars) 
		{
			return this._ltrim(this._rtrim(str, chars), chars);
		},
		 
		Tag.prototype._ltrim = function(str, chars) 
		{
			chars = chars || "\\s";
			return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
		},
		 
		Tag.prototype._rtrim = function(str, chars) 
		{
			chars = chars || "\\s";
			return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
		},

		Tag.prototype.autocomplete = function($input)
		{
			var _self = this;

			$('.tagger .autolist').on('mouseenter', '.row', function() 
			{
				var $this = $(this);

				_self.ac_highlight($this, false);
			});

			$('.tagger .autolist').on('mousedown', '.row', function() 
			{
				_self.$input.val($(this).find('.title').text());
				_self.ac_save(_self.$input, window.event);
			});

			$('.tagger').on('blur', '.taginput', function() 
			{
				_self.ac_hide(true);
			});

			$input.unbind('keydown').bind('keydown', function(e)
			{
				//console.log(e.which);
				switch(e.which)
				{
					case 37: // LEFT
					case 39: // RIGHT
					//case 8: // BACKSPACE
						return;
						break;
					// UP
					case 38:
						e.preventDefault();
						_self.ac_UP($input, e);
						return;
						break;
					// DOWN
					case 40:
						e.preventDefault();
						_self.ac_DOWN($input, e);
						return;
						break;
				}

				if(_self.$input.val().length > 0)
				{
					// ENTER
					if(e.which == 13)
					{
						_self.ac_save($input, e);
					}
					else
					{
						if(_self.timeout == null)
						{
							_self.timeout = setTimeout(function() { _self.ac_react($input, e); }, 250);
						}
						else
							console.log(_self.timeout);
					}
				}
				else
				{
					_self.ac_hide(true);

					if(e.which == 13 || e.which == 27)
					{
						$('.thumbnail .tagger').addClass('hidden');
						$('.thumbnail .active').removeClass('active');
					}
				}
			});
		};

		Tag.prototype.ac_react = function($input, e)
		{
			this.query = $input.val();
			var buf = [];
			var _self = this;

			this.aj = $.ajax(
			{
				type: "POST",
				url: "tags/autocomplete",
				data: "q=" + _self.query,
				dataType: 'json',
				success: function(data) 
				{
					var len = data.length;

					_self.$highl = undefined;

					for(var i = 0; i < len; i++)
					{
						buf.push('<li class="eS row'+(i==0?' first':(i==(len-1)?' last':''))+'" tid="'+data[i].tag_id+'" pur="'+data[i].tag_purity+'"><div class="eS title pur'+data[i].tag_purity+'">'+data[i].tag_title+'</div><div class="eS line2">'+data[i].cat_title+'</div></li>');
					}

					_self.$thumb.find('.tagger .autolist').html(buf.join(''));

					clearTimeout(_self.timeout);
					_self.timeout = null;
				}
			});
		};

		Tag.prototype.ac_highlight = function($row, copy_title)
		{
			$('.tagger .autolist .highl').removeClass('highl');
			$row.addClass('highl');

			this.$highl = $row;

			if(copy_title)
			{
				this.$input.val($row.find('.title').text());
			}
		};

		Tag.prototype.ac_unhighlight = function($row)
		{
			if(typeof $row == 'object')
			{
				$row.removeClass('highl');
			}
			else
			{
				$('.tagger .autolist .highl').removeClass('highl');
			}

			this.$highl = undefined;
			this.$input.val(this.query);
		};

		Tag.prototype.ac_UP = function($input, e)
		{
			if(typeof this.$highl == 'object')
			{
				if(this.$highl.hasClass('first'))
					this.ac_unhighlight(this.$highl);
				else
					this.ac_highlight(this.$highl.prev(), true);
			}
			else
			{
				this.ac_highlight($('.tagger .autolist .row:last'), true);
			}
		};

		Tag.prototype.ac_DOWN = function($input, e)
		{
			if(typeof this.$highl == 'object')
			{
				if(this.$highl.hasClass('last'))
					this.ac_unhighlight(this.$highl);
				else
					this.ac_highlight(this.$highl.next(), true);
			}
			else
			{
				this.ac_highlight($('.tagger .autolist .row:first'), true);
			}
		};

		Tag.prototype.ac_save = function($input, e)
		{
			var _self = this;
			var id = parseInt(this.$thumb.attr('id').substring(5));
			var query = this.$input.val();
			var tag_id = (typeof this.$highl == 'object' ? this.$highl.attr('tid') : 0);
			var purity = (typeof this.$highl == 'object' ? this.$highl.attr('pur') : 0);

			$.ajax(
			{
				type: "POST",
				url: "wallpaper/tagit/" + id,
				data: "tag_title=" + query + "&tag_id=" + tag_id + "&purity=" + purity + "&template=thumb",
				success: function(data, status, xhr) 
				{
					if(xhr.getResponseHeader('Tagform'))
					{
						Modal.open('350px', 'top', data);
					}
					else
					{
						data = JSON.parse(data);
						
						switch(data.status)
						{
							case 0:
								Growl.show('error', data.msg);
								break;

							case 2:
								_self.tooltip('show', 'Forbidden', data.msg);
								break;

							case 1:
								if(_self.$thumb.find('.taglist .tag_'+data.tag_id).length == 0)
									_self.$thumb.find('.taglist').prepend('<li class="row tag tag_'+data.tag_id+' clr"><div class="tag-wrap"><span class="icn">&#xe70c;</span><a href="'+base_url+'search?tag='+data.tag_id+'" title="'+data.title+'" class="tag-a pur'+data.purity+'">'+data.title+'</a><div class="opts"><a href="javascript:;" class="tag-x" tid="'+data.tag_id+'"><span class="spr spr-tag-x"></span></a><a href="'+ base_url +'tags/info/'+data.tag_id+'" class="tag-stats"><span class="spr spr-tag-stats"></span></a></div></div></li>');
								break;
						}
					}

					_self.ac_hide(true);
				}
			});
		};

		Tag.prototype.ac_hide = function(clear_input)
		{
			this.ac_unhighlight();
			this.$thumb.find('.autolist').empty();

			if(clear_input)
			{
				this.$input.val('');
				this.query = '';
			}
		};

		Tag.prototype.tooltip = function(opt, title, msg)
		{
			var _self = this;

			if(opt == 'show')
			{
				//_self.$thumb.find('.autocomp-wrap').prepend('<div class="tooltip"><div class="head">'+title+'</div><div class="cont">'+msg+'</div></div>');
				_self.$thumb.find('.taginput').css('background', '#DD7772');
				setTimeout(function() { _self.tooltip('hide');}, 500);
			}
			else
			{
				_self.$thumb.find('.taginput').css('background', '#fff');
				//_self.$thumb.find('.tooltip').remove();
			}
		};

		return Tag;
	})();

	this.Modal = (function()
	{
		function Modal()
		{
			this.opened = false;
			this.$modal = $('.modal');
			this.$window = $('.modal .window');
			var _self = this;

			$('.modal .bg').bind('click', function(e) { _self.close(e); });
		}

		Modal.prototype.open = function(w, layout, data, title)
		{
			var $window = this.$window;
			var width, height;

			if(typeof w == 'object')
			{
				width = w[0];
				height = w[1];
			}
			else
			{
				width = w;
				height = 'auto';
			}

			this.$modal.addClass('show');

			this.$window
				.css({'width': width, 'min-height': height})
				.addClass(layout);
			
			if(typeof title != 'undefined')
			{
				this.$window.html('<div class="header"></div><div class="msg">Make your selection:</div><div class="cont">'+data+'</div>')
					.find('.header').text(title);
			}
			else
			{
				title = 'Notice';
				this.$window.html(data)
					.find('.header').text(title);
			}

			setTimeout(function()
			{
				$window.addClass('opened');
			}, 10);
		};

		Modal.prototype.close = function(e, now, empty)
		{
			var doclose = false;
			var target = e && e.target;
			
			if($(target).hasClass('bg'))
			{
				doclose = true;
				empty = true;
			}
			else if(now === true)
				doclose = true;

			if(doclose)
			{
				if(empty)
				{
					try{ Newcat.cleanup(); }catch(e){}
					this.$window.empty();
				}

				var $modal = this.$modal;

				this.$window.removeClass('opened');

				setTimeout(function()
				{
					$modal.removeClass('show');
				}, 200);
			}
		};

		return Modal;
	})();

	this.Growl = (function()
	{
		function Growl()
		{
			this.$growl = $('.growl');
		}

		Growl.prototype.show = function(type, message, title) 
		{
			var title = typeof title == 'undefined' ? 'Whoops!' : title;

			$(this.$growl).addClass(type + ' show')
						  .find('.title')
						  .text(title)
						  .end()
						  .find('.desc')
						  .text(message);

			$(this.$growl).animate({'top': '20px'}, 300);

			setTimeout($.proxy(this.hide, this), 2000);
		};

		Growl.prototype.hide = function() 
		{
			$(this.$growl).removeClass('show');
			$(this.$growl).animate({'top': '-20px'}, 300);
		};

		return Growl;
	})();

}).call(this);

var WB = new WB();
var Modal = new Modal();
var Growl = new Growl();