/* awesomeCloud */
(function(d){var c="awesomeCloud",a={size:{grid:8,factor:0,normalize:true},color:{background:"rgba(255,255,255,0)",start:"#20f",end:"#e00"},options:{color:"gradient",rotationRatio:0.3,printMultiplier:1,sort:"highest"},font:"Helvetica, Arial, sans-serif",shape:"circle"};d.fn.awesomeCloud=function(f,e){if(typeof f==="object"){e=f;}else{if(typeof f==="string"){var g=this.data("_"+c);if(g){if(a[f]!==undefined){if(e!==undefined){g.settings[f]=e;return true;}else{return g.settings[f];}}else{return false;}}else{return false;}}}e=d.extend(true,{},a,e||{});return this.each(function(){var j=d(this),i=jQuery.extend(true,{},e),h=new b(i,j);h.create();j.data("_"+c,h);});};function b(e,f){this.bctx=null;this.bgPixel=null;this.ctx=null;this.diffChannel=null;this.container=f;this.grid=[];this.ngx=null;this.ngy=null;this.settings=e;this.size=null;this.words=[];return this;}b.prototype={create:function(){var j=this,u=0,g=null,e=0,r=0,k=c+"TempCheck",t=null,p=false,f=0,h=0.1,v=0,l=0,n=0,s=0,w,A,q,o,m;this.settings.weightFactor=function(i){return i*j.settings.size.factor;};this.settings.gridSize=Math.max(this.settings.size.grid,4)*this.settings.options.printMultiplier;this.settings.color.start=this.colorToRGBA(this.settings.color.start);this.settings.color.end=this.colorToRGBA(this.settings.color.end);this.settings.color.background=this.colorToRGBA(this.settings.color.background);this.settings.minSize=this.minimumFontSize();this.settings.ellipticity=1;switch(this.settings.shape){case"square":this.settings.shape=function(i){var x=(i+Math.PI/4)%(2*Math.PI/4);return 1/(Math.cos(x)+Math.sin(x));};break;case"diamond":this.settings.shape=function(i){var x=i%(2*Math.PI/4);return 1/(Math.cos(x)+Math.sin(x));};break;case"x":this.settings.shape=function(i){var x=i%(2*Math.PI/4);return 1/(Math.cos(x)+Math.sin(x)-(2*Math.PI/4));};break;case"triangle":this.settings.shape=function(i){var x=(i+Math.PI*3/2)%(2*Math.PI/3);return 1/(Math.cos(x)+Math.sqrt(3)*Math.sin(x));};break;case"triangle-forward":this.settings.shape=function(i){var x=i%(2*Math.PI/3);return 1/(Math.cos(x)+Math.sqrt(3)*Math.sin(x));};break;case"pentagon":this.settings.shape=function(i){var x=(i+0.955)%(2*Math.PI/5);return 1/(Math.cos(x)+0.726543*Math.sin(x));};break;case"star":this.settings.shape=function(i){var x=(i+0.955)%(2*Math.PI/10);if((i+0.955)%(2*Math.PI/5)-(2*Math.PI/10)>=0){return 1/(Math.cos((2*Math.PI/10)-x)+3.07768*Math.sin((2*Math.PI/10)-x));}else{return 1/(Math.cos(x)+3.07768*Math.sin(x));}};break;case"circle":default:this.settings.shape=function(i){return 1;};break;}this.size={left:this.container.offset().left,top:this.container.offset().top,height:(this.container.height()*this.settings.options.printMultiplier),width:(this.container.width()*this.settings.options.printMultiplier),screenHeight:this.container.height(),screenWidth:this.container.width()};this.settings.ellipticity=this.size.height/this.size.width;if(this.settings.ellipticity>2){this.settings.ellipticity=2;}if(this.settings.ellipticity<0.2){this.settings.ellipticity=0.2;}this.settings.weight={lowest:null,highest:null,average:null};this.container.children().each(function(x,y){r=parseInt(d(this).attr("data-weight"),10);e+=r;if(!j.settings.weight.lowest){j.settings.weight.lowest=r;}if(!j.settings.weight.highest){j.settings.weight.highest=r;}if(r<j.settings.weight.lowest){j.settings.weight.lowest=r;}if(r>j.settings.weight.highest){j.settings.weight.highest=r;}j.settings.weight.average=e/(x+1);d(this).css("display","none");j.words.push([d(this).html(),r]);});this.settings.range=this.settings.weight.highest-this.settings.weight.lowest;if(this.settings.size.normalize===true){this.words.sort(function(x,i){return(x[1]-i[1]);});for(u=0;u<this.words.length;u++){if(t===null){t=this.words[u][1];}else{if(this.words[u][1]-t>this.settings.weight.average){this.words[u][1]-=(this.words[u][1]-t)/(this.settings.weight.average*0.38)+t;}}}}this.words.sort(function(x,i){if(j.settings.options.sort==="random"){return 0.5-Math.random();}else{if(j.settings.options.sort==="lowest"){return(x[1]-i[1]);}else{return(i[1]-x[1]);}}});if(this.settings.size.factor===parseInt(0,10)){this.settings.size.factor=1;g=c+"SizeTest";p=false;f=0;h=0.1;v=0;l=0;n=0;s=0;w=Math.min(this.size.width,this.size.height);A=this.createCanvas({id:g,width:w,height:w,left:0,top:0});for(u=0;u<this.words.length;u++){A.font=this.settings.weightFactor(this.words[u][1])+"px "+this.settings.font;s=A.measureText(this.words[u][0]).width;if(s>v){v=s;l=this.words[u];}}while(!p){f=this.settings.weightFactor(l[1]);A.font=f.toString(10)+"px "+this.settings.font;s=A.measureText(l[0]).width;if(s>(w*0.95)){this.settings.size.factor-=h;}else{if(s<(w*0.9)){this.settings.size.factor+=h;}else{p=true;}}n++;if(n>10000){p=true;}}this.destroyCanvas(g);this.settings.size.factor-=h;}this.settings.color.increment={r:(this.settings.color.end.r-this.settings.color.start.r)/this.settings.range,g:(this.settings.color.end.g-this.settings.color.start.g)/this.settings.range,b:(this.settings.color.end.b-this.settings.color.start.b)/this.settings.range,a:(this.settings.color.end.a-this.settings.color.start.a)/this.settings.range};this.ngx=Math.floor(this.size.width/this.settings.gridSize);this.ngy=Math.floor(this.size.height/this.settings.gridSize);this.grid=[];g=c+this.container.attr("id");this.ctx=this.createCanvas({parent:this.container,id:g,width:this.size.width,height:this.size.height,left:"0px",top:"0px"});this.bctx=this.createCanvas({id:k,width:1,height:1,left:0,top:0});this.bctx.fillStyle=this.settings.color.background.rgba;this.bctx.clearRect(0,0,1,1);this.bctx.fillStyle=this.settings.color.background.rgba;this.bctx.fillRect(0,0,1,1);this.bgPixel=this.bctx.getImageData(0,0,1,1).data;if(typeof this.settings.options.color!=="function"&&this.settings.options.color.substr(0,6)!=="random"&&this.settings.options.color.substr(0,8)!=="gradient"){this.bctx.fillStyle=this.colorToRGBA(this.settings.options.color).rgba;this.bctx.fillRect(0,0,1,1);q=this.bctx.getImageData(0,0,1,1).data;u=4;while(u--){if(Math.abs(q[u]-this.bgPixel[u])>10){this.diffChannel=u;break;}}}else{this.diffChannel=NaN;}this.destroyCanvas(k);o=this.ngx;while(o--){this.grid[o]=[];m=this.ngy;while(m--){this.grid[o][m]=true;}}this.ctx.fillStyle=this.settings.color.background.rgba;this.ctx.clearRect(0,0,this.ngx*(this.settings.gridSize+1),this.ngy*(this.settings.gridSize+1));this.ctx.fillRect(0,0,this.ngx*(this.settings.gridSize+1),this.ngy*(this.settings.gridSize+1));this.ctx.textBaseline="top";u=0;window.setImmediate(function z(){if(u>=j.words.length){return;}j.putWord(j.words[u][0],j.words[u][1]);u++;window.setImmediate(z);});j.allDone(g);return true;},allDone:function(e){d("#"+e).width(this.size.screenWidth);d("#"+e).height(this.size.screenHeight);d("#"+e).css("display","block");d("#"+e).css("visibility","visible");},minimumFontSize:function(){var i=c+"FontTest",g=this.createCanvas({id:i,width:50,height:50,left:0,top:0}),f=20,h,e;while(f){g.font=f.toString(10)+"px sans-serif";if(g.measureText("\uFF37").width===h&&g.measureText("m").width===e){this.destroyCanvas(i);return(f+1)/2;}h=g.measureText("\uFF37").width;e=g.measureText("m").width;f--;}this.destroyCanvas(i);return 0;},createCanvas:function(e){var h=e.id,f,g=d("body");if(e.parent!==undefined){g=e.parent;}g.append('<canvas id="'+h+'" width="'+e.width+'" height="'+e.height+'">.</canvas>');d("#"+h).css("visibility","hidden");d("#"+h).css("display","none");d("#"+h).css("position","relative");d("#"+h).css("z-index",10000);d("#"+h).width(e.width);d("#"+h).height(e.height);d("#"+h).offset({top:e.top,left:e.left});f=document.getElementById(h);f.setAttribute("width",e.width);f.setAttribute("height",e.height);return f.getContext("2d");},destroyCanvas:function(e){d("#"+e).remove();},putWord:function(x,m){var k=this,u=(Math.random()<this.settings.options.rotationRatio),f=this.settings.weightFactor(m),v=null,l=null,n,y,A,i,g,p,o,j,q,z,e,s;if(f<=this.settings.minSize){return false;}this.ctx.font=f.toString(10)+"px "+this.settings.font;if(u){v=this.ctx.measureText(x).width;l=Math.max(f,this.ctx.measureText("m").width,this.ctx.measureText("\uFF37").width);if(/[Jgpqy]/.test(x)){l*=3/2;}l+=Math.floor(f/6);v+=Math.floor(f/6);}else{l=this.ctx.measureText(x).width;v=Math.max(f,this.ctx.measureText("m").width,this.ctx.measureText("\uFF37").width);if(/[Jgpqy]/.test(x)){v*=3/2;}v+=Math.floor(f/6);l+=Math.floor(f/6);}l=Math.ceil(l);v=Math.ceil(v);n=Math.ceil(l/this.settings.gridSize);y=Math.ceil(v/this.settings.gridSize);A=[this.ngx/2,this.ngy/2];i=Math.floor(Math.sqrt(this.ngx*this.ngx+this.ngy*this.ngy));g=this.ngx+this.ngy;p=i+1;while(p--){o=g;s=[];while(o--){j=this.settings.shape(o/g*2*Math.PI);s.push([Math.floor(A[0]+(i-p)*j*Math.cos(-o/g*2*Math.PI)-n/2),Math.floor(A[1]+(i-p)*j*this.settings.ellipticity*Math.sin(-o/g*2*Math.PI)-y/2),o/g*2*Math.PI]);}if(s.shuffle().some(function(h){if(k.canFitText(h[0],h[1],n,y)){if(u){e=c+"Rotator";z=k.createCanvas({id:e,width:l,height:v,left:0,top:0});q=document.getElementById(e);z.fillStyle=k.settings.color.background.rgba;z.fillRect(0,0,l,v);z.fillStyle=k.wordcolor(x,m,f,i-p,h[2]);z.font=f.toString(10)+"px "+k.settings.font;z.textBaseline="top";if(u){z.translate(0,v);z.rotate(-Math.PI/2);}z.fillText(x,Math.floor(f/6),0);k.ctx.clearRect(Math.floor(h[0]*k.settings.gridSize+(n*k.settings.gridSize-l)/2),Math.floor(h[1]*k.settings.gridSize+(y*k.settings.gridSize-v)/2),l,v);k.ctx.drawImage(q,Math.floor(h[0]*k.settings.gridSize+(n*k.settings.gridSize-l)/2),Math.floor(h[1]*k.settings.gridSize+(y*k.settings.gridSize-v)/2),l,v);k.destroyCanvas(e);}else{k.ctx.font=f.toString(10)+"px "+k.settings.font;k.ctx.fillStyle=k.wordcolor(x,m,f,i-p,h[2]);k.ctx.fillText(x,h[0]*k.settings.gridSize+(n*k.settings.gridSize-l)/2,h[1]*k.settings.gridSize+(y*k.settings.gridSize-v)/2);}k.updateGrid(h[0],h[1],n,y);return true;}return false;})){return true;}}return false;},canFitText:function(h,g,i,f){if(h<0||g<0||h+i>this.ngx||g+f>this.ngy){return false;}var e=i,j;while(e--){j=f;while(j--){if(!this.grid[h+e][g+j]){return false;}}}return true;},wordcolor:function(j,i,h,e,g){var f=null;switch(this.settings.options.color){case"gradient":f="rgba("+Math.round(this.settings.color.start.r+(this.settings.color.increment.r*(i-this.settings.weight.lowest)))+","+Math.round(this.settings.color.start.g+(this.settings.color.increment.g*(i-this.settings.weight.lowest)))+","+Math.round(this.settings.color.start.b+(this.settings.color.increment.b*(i-this.settings.weight.lowest)))+","+Math.round(this.settings.color.start.a+(this.settings.color.increment.a*(i-this.settings.weight.lowest)))+")";break;case"random-dark":f="rgba("+Math.floor(Math.random()*128).toString(10)+","+Math.floor(Math.random()*128).toString(10)+","+Math.floor(Math.random()*128).toString(10)+",1)";break;case"random-light":f="rgba("+Math.floor(Math.random()*128+128).toString(10)+","+Math.floor(Math.random()*128+128).toString(10)+","+Math.floor(Math.random()*128+128).toString(10)+",1)";break;default:if(typeof this.settings.wordColor!=="function"){f="rgba(127,127,127,1)";}else{f=this.settings.wordColor(j,i,h,e,g);}break;}return f;},updateGrid:function(i,g,k,f,j){var e=k,l,h=this.ctx.getImageData(i*this.settings.gridSize,g*this.settings.gridSize,k*this.settings.gridSize,f*this.settings.gridSize);while(e--){l=f;while(l--){if(!this.isGridEmpty(h,e*this.settings.gridSize,l*this.settings.gridSize,k*this.settings.gridSize,f*this.settings.gridSize,j)){this.grid[i+e][g+l]=false;}}}},isGridEmpty:function(e,p,o,q,n,f){var m=this.settings.gridSize,l,g;if(!isNaN(this.diffChannel)&&!f){while(m--){l=this.settings.gridSize;while(l--){if(this.getChannelData(e.data,p+m,o+l,q,n,this.diffChannel)!==this.bgPixel[this.diffChannel]){return false;}}}}else{while(m--){l=this.settings.gridSize;while(l--){g=4;while(g--){if(this.getChannelData(e.data,p+m,o+l,q,n,g)!==this.bgPixel[g]){return false;}}}}}return true;},getChannelData:function(i,e,k,f,g,j){return i[(k*f+e)*4+j];},colorToRGBA:function(j){j=j.replace(/^\s*#|\s*$/g,"");if(j.length===3){j=j.replace(/(.)/g,"$1$1");}j=j.toLowerCase();var f={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"},n=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(g){return[parseInt(g[1],10),parseInt(g[2],10),parseInt(g[3],10),1];}},{re:/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\s*\)/,example:["rgb(123, 234, 45, 1)","rgb(255,234,245, 0.5)"],process:function(g){return[parseInt(g[1],10),parseInt(g[2],10),parseInt(g[3],10),parseFloat(g[4])];}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(g){return[parseInt(g[1],16),parseInt(g[2],16),parseInt(g[3],16),1];}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(g){return[parseInt(g[1]+g[1],16),parseInt(g[2]+g[2],16),parseInt(g[3]+g[3],16),1];}}],e,m,o,p,q,k,t,h,s,l;for(q in f){if(j===q){j=f[q];}}for(k=0;k<n.length;k++){t=n[k].re;h=n[k].process;s=t.exec(j);if(s){l=h(s);e=l[0];m=l[1];o=l[2];p=l[3];}}e=(e<0||isNaN(e))?0:((e>255)?255:e);m=(m<0||isNaN(m))?0:((m>255)?255:m);o=(o<0||isNaN(o))?0:((o>255)?255:o);p=(p<0||isNaN(p))?0:((p>1)?1:p);return{r:e,g:m,b:o,a:p,rgba:"rgba("+e+", "+m+", "+o+", "+p+")"};}};})(jQuery);Array.prototype.shuffle=function(){for(var b,a,c=this.length;c;b=parseInt(Math.random()*c,10),a=this[--c],this[c]=this[b],this[b]=a){}return this;};if(!window.setImmediate){window.setImmediate=(function(){return window.msSetImmediate||window.webkitSetImmediate||window.mozSetImmediate||window.oSetImmediate||(function(){if(window.postMessage&&window.addEventListener){var b=[],f=-1,d=-1,a="zero-timeout-message",e=function(h){b.push(h);window.postMessage(a,"*");return ++d;},g=function(i){if(i.data===a){i.stopPropagation();if(b.length>0){var h=b.shift();h();f++;}}},c;window.addEventListener("message",g,true);window.clearImmediate=function(h){if(typeof h!=="number"||h>d){return;}c=h-f-1;b[c]=(function(){});};return e;}})()||function(a){window.setTimeout(a,0);};})();}if(!window.clearImmediate){window.clearImmediate=(function(){return window.msClearImmediate||window.webkitClearImmediate||window.mozClearImmediate||window.oClearImmediate||function(a){window.clearTimeout(a);};})();}/*
	fancyInput v1.3.0
	(c) 2013 Yair Even Or <http://dropthebit.com>
*/
(function(e){"use strict";function u(t){var n=t.selector;t.each(function(){var t="fancyInput",n=e('<div><b class="caret">&#8203;</b></div>');if(this.tagName=="TEXTAREA")t+=" textarea";e(this.parentNode).append(n).addClass(t);if(this.value)i.fillText(this.value,this)});e(document).on("input.fi",n,i.input).on("keypress.fi",n,i.keypress).on("keyup.fi select.fi mouseup.fi cut.fi paste.fi blur.fi",n,i.allEvents).on("mousedown.fi mouseup.fi keydown.fi",n,s.set).on("keydown.fi",n,i.keydown)}var t=!!window.ActiveXObject,n="webkitRequestAnimationFrame"in window,r;e.fn.fancyInput=function(){if(!t||"ontouchstart"in document.documentElement)u(this);return this};var i={classToggler:"state1",keypress:function(e){var t=String.fromCharCode(e.charCode),n=this.nextElementSibling,r=this.selectionEnd,s=this.tagName=="TEXTAREA"&&e.keyCode==13;if(this.selectionEnd-this.selectionStart>0&&e.charCode&&!(e.metaKey||e.ctrlKey)){var u=[this.selectionStart,this.selectionEnd];r=this.selectionStart;if(o.lastDir=="rtl"){u=[this.value.length-this.selectionEnd,this.value.length-this.selectionStart+1]}i.removeChars(n,u)}if(e.charCode&&!(e.metaKey||e.ctrlKey)||s){var a=o.check(t);if(a=="rtl"||a==""&&o.lastDir=="rtl")r=this.value.length-this.selectionStart;if(s)t="";i.maskPassword(this);i.writer(t,this,r)}},input:function(){i.textLength=this.value.length;i.inputResize(this)},maskPassword:function(t){if(t.type=="password")e(t.nextElementSibling).find("span").each(function(){this.innerHTML=""})},setCaretHeight:function(t){var n=e(t.nextElementSibling);if(!n.find("span").length)return false;r=n.find("span")[0].clientHeight;n.find("b").height(r)},writer:function(t,n,r){var i=e(n.nextElementSibling).children().not("b"),s=document.createElement("span");if(t==" ")t="&nbsp;";if(t){s.innerHTML=t;this.classToggler=this.classToggler=="state2"?"state1":"state2";s.className=this.classToggler}else s=document.createElement("br");if(i.length){if(r==0)e(n.nextElementSibling).prepend(s);else{var o=i.eq(--r);o.after(s)}}else n.nextElementSibling.appendChild(s);if(t)setTimeout(function(){s.removeAttribute("class")},20);return this},clear:function(t){var n=e(t.parentNode).find(".caret");e(t).html(n)},fillText:function(e,t){var n=t.nextElementSibling,r,s=document.createDocumentFragment();i.clear(t.nextElementSibling);setTimeout(function(){var t=e.length;for(var i=0;i<t;i++){var o="span";if(e[i]=="\n")o="br";r=document.createElement(o);r.innerHTML=e[i]==" "?"&nbsp;":e[i];s.appendChild(r)}n.appendChild(s)},0)},removeChars:function(t,r){var i=e(t).children().not("b").not(".deleted"),s=e(t).find("b"),o;if(r[0]==r[1])r[0]--;o=i.slice(r[0],r[1]);if(r[1]-r[0]==1){o.css("position","absolute");if(n)o[0].offsetLeft;o.addClass("deleted");setTimeout(function(){o.remove()},140)}else o.remove()},inputResize:function(t){if(t.tagName=="TEXTAREA"){setTimeout(function(){t.style.top="-999px";var n=t.parentNode.scrollHeight;if(e(t).outerHeight()<t.parentNode.scrollHeight)n+=10;t.style.height=n+"px";t.style.top="0";setTimeout(function(){t.scrollTop=0;t.parentNode.scrollTop=9999},50)},0)}if(t.tagName=="INPUT"&&t.type=="text"){t.style.width=0;var n=t.parentNode.scrollWidth;if(t.parentNode.scrollWidth>t.parentNode.clientWidth)n+=20;t.style.width=n+"px"}},keydown:function(e){var t=String.fromCharCode(e.charCode),n=this.nextElementSibling,r=this.selectionEnd,s=(e.metaKey||e.ctrlKey)&&e.keyCode==90||e.altKey&&e.keyCode==8,u=(e.metaKey||e.ctrlKey)&&e.keyCode==89,a=(e.metaKey||e.ctrlKey)&&e.keyCode==65,f=this.selectionEnd==this.selectionStart&&this.selectionEnd==this.value.length,l=e.keyCode==46&&!f;i.setCaret(this);if(a)return true;if(s||u){setTimeout(function(){i.fillText(e.target.value,e.target)},50);return true}if(e.keyCode==8||l){var c=[this.selectionStart,this.selectionEnd];if(o.lastDir=="rtl")c=[this.value.length-this.selectionEnd,this.value.length-this.selectionStart+1];if(l&&this.selectionEnd==this.selectionStart&&this.selectionEnd<this.value.length){c[0]+=1;c[1]+=1;i.removeChars(n,c)}else setTimeout(function(){if(e.metaKey||e.ctrlKey)c=[e.target.selectionStart,c[0]];i.removeChars(n,c)},0)}if(this.selectionStart==0)this.parentNode.scrollLeft=0;return true},allEvents:function(e){i.setCaret(this);if(e.type=="paste"){setTimeout(function(){i.fillText(e.target.value,e.target);i.inputResize(e.target)},20)}if(e.type=="cut"){i.removeChars(this.nextElementSibling,[this.selectionStart,this.selectionEnd])}if(!e.keyCode||e.keyCode<50)i.maskPassword(this);if(!r){setTimeout(function(){i.setCaretHeight(e.target)},150)}if(this.selectionStart==this.value.length)this.parentNode.scrollLeft=999999},setCaret:function(t){var n=e(t.parentNode).find(".caret"),r=e(t.nextElementSibling).children().not("b"),s=r.not(".deleted"),u=i.getCaretPosition(t);if(o.lastDir=="rtl")u=t.value.length-u;var a=s.eq(u);if(u==t.value.length){n.appendTo(t.nextElementSibling)}else n.insertBefore(a)},getCaretPosition:function(e){var t,n=s.direction||"right";if(e.selectionStart||e.selectionStart=="0")t=n=="left"?e.selectionStart:e.selectionEnd;return t||0}},s={direction:null,lastOffset:null,set:function(e){var t;if(e.shiftKey&&e.keyCode==37)t="left";else if(e.shiftKey&&e.keyCode==39)t="right";if(e.type=="mousedown")s.lastOffset=e.clientX;else if(e.type=="mouseup")t=e.clientX<s.lastOffset?"left":"right";s.direction=t}},o={lastDir:null,check:function(e){var t='A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',n='\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',r=new RegExp("^[^"+n+"]*["+t+"]"),i=new RegExp("^[^"+t+"]*["+n+"]");var s=i.test(e)?"rtl":r.test(e)?"ltr":"";if(s)this.lastDir=s;return s}};window.fancyInput=i})(window.jQuery);
/* jQuery cookie v 1.3.1 */
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){function n(e){return e}function r(e){return decodeURIComponent(e.replace(t," "))}function i(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return s.json?JSON.parse(e):e}catch(t){}}var t=/\+/g;var s=e.cookie=function(t,o,u){if(o!==undefined){u=e.extend({},s.defaults,u);if(typeof u.expires==="number"){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}o=s.json?JSON.stringify(o):String(o);return document.cookie=[s.raw?t:encodeURIComponent(t),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=s.raw?n:r;var c=document.cookie.split("; ");var h=t?undefined:{};for(var p=0,d=c.length;p<d;p++){var v=c[p].split("=");var m=l(v.shift());var g=l(v.join("="));if(t&&t===m){h=i(g);break}if(!t){h[m]=i(g)}}return h};s.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend({},n,{expires:-1}));return true}return false}});

(function()
{
	this.Home = (function()
	{
		function Home()
		{
			$('.maininput').fancyInput();

			this.screenW = $(window).width();

			// set the cookie for featured walls
			if( ! $.cookie('wb_screenW'))
			{
				$.cookie('wb_screenW', this.screenW, {path: '/', expires: 1});
			}

			// detect ie10
			var ua = navigator.userAgent.toLowerCase();
			var match = /(msie) ([\w.]+)/.exec(ua) || [];
			var agent = {
				browser: match[1] || "",
				version: parseInt(match[2]) || 0
			};

			if(agent.browser == 'msie' && agent.version == 10)
			{
				yepnope.injectCss(opt.path.views + 'css/ie.css');
			}
			
			this.on_resize(true);

			// wordcloud
			var cloud_opts = {
				size: {
					grid: 5,
					factor: 0.1
				},
				options: {
					rotationRatio: 0.35,
				},
				color: {
					background: 'transparent',
					start: '#666',
					end: '#D05F5F'
				},
				font: 'Colab, Tahoma, Verdana',
				shape: 'square'
			};

			$('.popsearches').awesomeCloud(cloud_opts);

			$('.colorpie').bind('click', this.colorpie_click);
			$('.cc-decoy').bind('focus', this.colors_show);
			$('.cc-cancel').bind('click', this.colors_cancel);
			$('.searchform').bind('submit', this.dosearch);

			$(window).resize(function() 
			{
			    if(this.resizeTO) clearTimeout(this.resizeTO);
			    this.resizeTO = setTimeout(function() 
			    {
			        $(this).trigger('resizeEnd');
			    }, 300);
			});

			$(window).bind('resizeEnd', $.proxy(this.on_resize, this));
		}

		Home.prototype.byimage_init = function(e)
		{
			var _self = this;

			$('#byimage_input').fileupload({
		        url: 'uploadfile/upload_searchby_img',
		        dataType: 'json',
		        maxFileSize: 9000000,  // 9000KB
	            acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
	            disableImageResize: true,
	            limitMultiFileUploads: 1,
	            autoUpload: true,
	            maxNumberOfFiles: 1,
        		dropZone: $('body'),

        		add: function(e, data)
        		{
        			data.submit();
        		},

	            fail: function(e, data)
	            {
	            	Growl.show('error', 'Unexpected upload error');
	            },

		        done: function (e, data) 
		        {
		        	if(data.result.status == 0)
		        	{
		        		Growl.show('error', data.result.error, 'Whoops!');
		        		return;
		        	}

		        	var d = data.result[0];

		        	$('.byinp-name').val(d.name);
		        	$('.byinp-type').val(d.type);
		        	$('.byinp-url').val(d.url);
		        	$('.byinp-weight').val(d.weight);

		        	$('.byimage-form').submit();
		        },

		        progressall: function (e, data) 
		        {
		            var progress = parseInt(data.loaded / data.total * 100, 10);
		            $('.byimage-progress').css('width', progress + '%');
		        },

		        stop: function()
		        {
		        	$('.byimage-progress').css('width', '0');
		        }
        	});
		};

		Home.prototype.colorpie_click = function()
		{
			$('.cc-decoy').focus();
		};

		Home.prototype.on_resize = function(first)
		{
			if(first !== true)
				this.screenW = $(window).width();

			var move = 1423 - this.screenW;
			var fsize = opt.featsize == 'L' ? -738 : -288;

			$('.line3-wrap').css('left', (fsize-(move/2))+'px');
		};

		Home.prototype.colors_show = function()
		{
			$('.color-caption').addClass('show');
			$('.cc-cancel').addClass('show');

			$('.cc-decoy').css('z-index', 7);

			$('.cc-wrap').css('z-index', 6);
			$('.byimage-wrap').css('z-index', 4);
		};

		Home.prototype.colors_cancel = function()
		{
			$('.color-caption').removeClass('show');
			$('.cc-cancel').removeClass('show');
			$('.cc-decoy').val('').css('z-index', 6);

			$('.cc-wrap').css('z-index', 4);
			$('.byimage-wrap').css('z-index', 6);
		};

		Home.prototype.dosearch = function()
		{
			var q = $('#query').val();
			var color = $('#color').val().substring(1);

			window.location.href = base_url + 'search?q=' + q + (color ? '&color=' + color : '');
			return false;
		};

		return Home;
	})();

}).call(this);

var Home = new Home();

yepnope(
[
    {
        test: opt.loggedin,
        yep: ['js/upload/load-image.min.js', 'js/upload/jquery.iframe-transport.js', 'js/upload/jquery.fileupload.js', 'js/upload/jquery.fileupload-process.js', 'js/upload/jquery.fileupload-image.js'],
        complete: function()
        {
        	Home.byimage_init();
        }
    },
]);