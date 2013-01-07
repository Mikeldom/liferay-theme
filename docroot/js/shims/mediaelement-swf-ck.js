jQuery.webshims.register("mediaelement-swf",function(e,t,n,r,i,s){var o=t.mediaelement,u=n.swfobject,a=Modernizr.audio&&Modernizr.video,f=u.hasFlashPlayerVersion("9.0.115"),l=0,n={paused:!0,ended:!1,currentSrc:"",duration:n.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(e){if(!e)return 0;t.error("buffered index size error")},end:function(e){if(!e)return 0;t.error("buffered index size error")},length:0}},c=Object.keys(n),h={currentTime:0,volume:1,muted:!1};Object.keys(h);var p=e.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_durationCalcs:-1,_callMeta:!1,currentTime:0,_ppFlag:i},n,h),d=/^jwplayer-/,v=function(e){if(e=r.getElementById(e.replace(d,"")))return e=t.data(e,"mediaelement"),"third"==e.isActive?e:null},m=function(e){return(e=t.data(e,"mediaelement"))&&"third"==e.isActive?e:null},g=function(t,n){n=e.Event(n);n.preventDefault();e.event.trigger(n,i,t)},y=s.playerPath||t.cfg.basePath+"jwplayer/"+(s.playerName||"player.swf"),b=s.pluginPath||t.cfg.basePath+"swf/jwwebshims.swf";t.extendUNDEFProp(s.params,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});t.extendUNDEFProp(s.vars,{screencolor:"ffffffff"});t.extendUNDEFProp(s.attrs,{bgcolor:"#000000"});var w=function(t,n){var r=t.duration;if(!(r&&0<t._durationCalcs)){try{if(t.duration=t.jwapi.getPlaylist()[0].duration,!t.duration||0>=t.duration||t.duration===t._lastDuration)t.duration=r}catch(i){}t.duration&&t.duration!=t._lastDuration?(g(t._elem,"durationchange"),("audio"==t._elemNodeName||t._callMeta)&&o.jwEvents.Model.META(e.extend({duration:t.duration},n),t),t._durationCalcs--):t._durationCalcs++}},E=function(e,t){3>e&&clearTimeout(t._canplaythroughTimer);3<=e&&3>t.readyState&&(t.readyState=e,g(t._elem,"canplay"),clearTimeout(t._canplaythroughTimer),t._canplaythroughTimer=setTimeout(function(){E(4,t)},4e3));4<=e&&4>t.readyState&&(t.readyState=e,g(t._elem,"canplaythrough"));t.readyState=e};e.extend(e.event.customEvent,{updatemediaelementdimensions:!0,flashblocker:!0,swfstageresize:!0,mediaelementapichange:!0});o.jwEvents={View:{PLAY:function(e){var t=v(e.id);if(t&&!t.stopPlayPause&&(t._ppFlag=!0,t.paused==e.state)){t.paused=!e.state;t.ended&&(t.ended=!1);g(t._elem,e.state?"play":"pause")}}},Model:{BUFFER:function(t){var n=v(t.id);if(n&&"percentage"in t&&n._bufferedEnd!=t.percentage){n.networkState=100==t.percentage?1:2;(isNaN(n.duration)||5<t.percentage&&25>t.percentage||100===t.percentage)&&w(n,t);n.ended&&(n.ended=!1);if(n.duration){2<t.percentage&&20>t.percentage?E(3,n):20<t.percentage&&E(4,n);n._bufferedEnd&&n._bufferedEnd>t.percentage&&(n._bufferedStart=n.currentTime||0);n._bufferedEnd=t.percentage;n.buffered.length=1;100==t.percentage&&(n.networkState=1,E(4,n));e.event.trigger("progress",i,n._elem,!0)}}},META:function(e,t){if(t=t&&t.networkState?t:v(e.id))if("duration"in e){if(!t._metadata||!!e.height&&t.videoHeight!=e.height||e.duration!==t.duration){t._metadata=!0;var n=t.duration;e.duration&&(t.duration=e.duration);t._lastDuration=t.duration;if(e.height||e.width)t.videoHeight=e.height||0,t.videoWidth=e.width||0;t.networkState||(t.networkState=2);1>t.readyState&&E(1,t);t.duration&&n!==t.duration&&g(t._elem,"durationchange");g(t._elem,"loadedmetadata")}}else t._callMeta=!0},TIME:function(e){var t=v(e.id);if(t&&t.currentTime!==e.position){t.currentTime=e.position;t.duration&&t.duration<t.currentTime&&w(t,e);2>t.readyState&&E(2,t);t.ended&&(t.ended=!1);g(t._elem,"timeupdate")}},STATE:function(e){var t=v(e.id);if(t)switch(e.newstate){case"BUFFERING":t.ended&&(t.ended=!1);E(1,t);g(t._elem,"waiting");break;case"PLAYING":t.paused=!1;t._ppFlag=!0;t.duration||w(t,e);3>t.readyState&&E(3,t);t.ended&&(t.ended=!1);g(t._elem,"playing");break;case"PAUSED":!t.paused&&!t.stopPlayPause&&(t.paused=!0,t._ppFlag=!0,g(t._elem,"pause"));break;case"COMPLETED":4>t.readyState&&E(4,t),t.ended=!0,g(t._elem,"ended")}}},Controller:{ERROR:function(e){var t=v(e.id);t&&o.setError(t._elem,e.message)},SEEK:function(e){var t=v(e.id);if(t){t.ended&&(t.ended=!1);if(t.paused)try{t.jwapi.sendEvent("play","false")}catch(n){}t.currentTime!=e.position&&(t.currentTime=e.position,g(t._elem,"timeupdate"))}},VOLUME:function(e){var t=v(e.id);t&&(e=e.percentage/100,t.volume!=e)&&(t.volume=e,g(t._elem,"volumechange"))},MUTE:function(e){if(!e.state){var t=v(e.id);t&&t.muted!=e.state&&(t.muted=e.state,g(t._elem,"volumechange"))}}}};var S=function(t){var n=!0;e.each(o.jwEvents,function(r,i){e.each(i,function(e){try{t.jwapi["add"+r+"Listener"](e,"jQuery.webshims.mediaelement.jwEvents."+r+"."+e)}catch(i){return n=!1}})});return n},x=function(e){var t=e.actionQueue.length,n=0,r;if(t&&"third"==e.isActive)for(;e.actionQueue.length&&t>n;)n++,r=e.actionQueue.shift(),e.jwapi[r.fn].apply(e.jwapi,r.args);e.actionQueue.length&&(e.actionQueue=[])},T=function(t){t&&(t._ppFlag===i&&e.prop(t._elem,"autoplay")||!t.paused)&&setTimeout(function(){if("third"==t.isActive&&(t._ppFlag===i||!t.paused))try{e(t._elem).play()}catch(n){}},1)};o.playerResize=function(t){t&&(t=r.getElementById(t.replace(d,"")))&&e(t).triggerHandler("swfstageresize")};e(r).on("emptied",function(e){e=m(e.target);T(e)});var N;o.jwPlayerReady=function(n){var r=v(n.id),i=0,s=function(){if(!(9<i))if(i++,S(r)){if(r.wasSwfReady)e(r._elem).mediaLoad();else{var o=parseFloat(n.version,10);(5.1>o||6<=o)&&t.warn("mediaelement-swf is only testet with jwplayer 5.6+")}r.wasSwfReady=!0;r.tryedReframeing=0;x(r);T(r)}else clearTimeout(r.reframeTimer),r.reframeTimer=setTimeout(s,9*i),2<i&&9>r.tryedReframeing&&(r.tryedReframeing++,r.shadowElem.css({overflow:"visible"}),setTimeout(function(){r.shadowElem.css({overflow:"hidden"})},16))};if(r&&r.jwapi){r.tryedReframeing||(r.tryedReframeing=0);clearTimeout(N);r.jwData=n;r.shadowElem.removeClass("flashblocker-assumed");e.prop(r._elem,"volume",r.volume);e.prop(r._elem,"muted",r.muted);s()}};var C=e.noop;if(a){var k={play:1,playing:1},L="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),A=L.map(function(e){return e+".webshimspolyfill"}).join(" "),O=function(n){var r=t.data(n.target,"mediaelement");r&&(n.originalEvent&&n.originalEvent.type===n.type)==("third"==r.activating)&&(n.stopImmediatePropagation(),k[n.type]&&r.isActive!=r.activating&&e(n.target).pause())},C=function(n){e(n).off(A).on(A,O);L.forEach(function(e){t.moveToFirstEvent(n,e)})};C(r)}o.setActive=function(n,r,i){i||(i=t.data(n,"mediaelement"));if(i&&i.isActive!=r){"html5"!=r&&"third"!=r&&t.warn("wrong type for mediaelement activating: "+r);var s=t.data(n,"shadowData");i.activating=r;e(n).pause();i.isActive=r;"third"==r?(s.shadowElement=s.shadowFocusElement=i.shadowElem[0],e(n).addClass("swf-api-active nonnative-api-active").hide().getShadowElement().show()):(e(n).removeClass("swf-api-active nonnative-api-active").show().getShadowElement().hide(),s.shadowElement=s.shadowFocusElement=!1);e(n).trigger("mediaelementapichange")}};var M=function(){var e="_bufferedEnd,_bufferedStart,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta,_durationCalcs".split(","),t=e.length;return function(n){if(n){var r=t,i=n.networkState;for(E(0,n);--r;)delete n[e[r]];n.actionQueue=[];n.buffered.length=0;i&&g(n._elem,"emptied")}}}(),_=function(t,n){var r=t._elem,i=t.shadowElem;e(r)[n?"addClass":"removeClass"]("webshims-controls");"audio"==t._elemNodeName&&!n?i.css({width:0,height:0}):i.css({width:r.style.width||e(r).width(),height:r.style.height||e(r).height()})};o.createSWF=function(n,r,i){if(f){1>l?l=1:l++;var c=e.extend({},s.vars,{image:e.prop(n,"poster")||"",file:r.srcProp}),h=e(n).data("vars")||{};i||(i=t.data(n,"mediaelement"));if(i&&i.swfCreated)o.setActive(n,"third",i),M(i),i.currentSrc=r.srcProp,e.extend(c,h),s.changeSWF(c,n,r,i,"load"),D(n,"sendEvent",["LOAD",c]);else{var d=e.prop(n,"controls"),v="jwplayer-"+t.getID(n),m=e.extend({},s.params,e(n).data("params")),g=n.nodeName.toLowerCase(),w=e.extend({},s.attrs,{name:v,id:v},e(n).data("attrs")),E=e('<div class="polyfill-'+g+' polyfill-mediaelement" id="wrapper-'+v+'"><div id="'+v+'"></div>').css({position:"relative",overflow:"hidden"}),i=t.data(n,"mediaelement",t.objectCreate(p,{actionQueue:{value:[]},shadowElem:{value:E},_elemNodeName:{value:g},_elem:{value:n},currentSrc:{value:r.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(e){if(!(e>=i.buffered.length))return 0;t.error("buffered index size error")},end:function(e){if(!(e>=i.buffered.length))return(i.duration-i._bufferedStart)*i._bufferedEnd/100+i._bufferedStart;t.error("buffered index size error")},length:0}}}));_(i,d);E.insertBefore(n);a&&e.extend(i,{volume:e.prop(n,"volume"),muted:e.prop(n,"muted")});e.extend(c,{id:v,controlbar:d?s.vars.controlbar||("video"==g?"over":"bottom"):"video"==g?"none":"bottom",icons:""+(d&&"video"==g)},h,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});c.plugins=c.plugins?c.plugins+(","+b):b;t.addShadowDom(n,E);C(n);o.setActive(n,"third",i);s.changeSWF(c,n,r,i,"embed");e(n).on("updatemediaelementdimensions updateshadowdom",function(){_(i,e.prop(n,"controls"))});u.embedSWF(y,v,"100%","100%","9.0.0",!1,c,m,w,function(r){r.success&&(i.jwapi=r.ref,d||e(r.ref).attr("tabindex","-1").css("outline","none"),setTimeout(function(){if(!r.ref.parentNode&&E[0].parentNode||"none"==r.ref.style.display)E.addClass("flashblocker-assumed"),e(n).trigger("flashblocker"),t.warn("flashblocker assumed");e(r.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),N||(clearTimeout(N),N=setTimeout(function(){var n=e(r.ref);1<n[0].offsetWidth&&1<n[0].offsetHeight&&0===location.protocol.indexOf("file:")?t.error("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):(2>n[0].offsetWidth||2>n[0].offsetHeight)&&t.warn("JS-SWF connection can't be established on hidden or unconnected flash objects")},8e3)))})}}else setTimeout(function(){e(n).mediaLoad()},1)};var D=function(e,t,n,r){return(r=r||m(e))?(r.jwapi&&r.jwapi[t]?r.jwapi[t].apply(r.jwapi,n||[]):(r.actionQueue.push({fn:t,args:n}),10<r.actionQueue.length&&setTimeout(function(){5<r.actionQueue.length&&r.actionQueue.shift()},99)),r):!1};["audio","video"].forEach(function(n){var r={},i,s=function(e){"audio"==n&&("videoHeight"==e||"videoWidth"==e)||(r[e]={get:function(){var t=m(this);return t?t[e]:a&&i[e].prop._supget?i[e].prop._supget.apply(this):p[e]},writeable:!1})},o=function(e,t){s(e);delete r[e].writeable;r[e].set=t};o("volume",function(e){var n=m(this);if(n){if(e*=100,!isNaN(e)){var r=n.muted;(0>e||100<e)&&t.error("volume greater or less than allowed "+e/100);D(this,"sendEvent",["VOLUME",e],n);if(r)try{n.jwapi.sendEvent("mute","true")}catch(s){}e/=100;n.volume!=e&&"third"==n.isActive&&(n.volume=e,g(n._elem,"volumechange"))}}else if(i.volume.prop._supset)return i.volume.prop._supset.apply(this,arguments)});o("muted",function(e){var t=m(this);if(t){if(e=!!e,D(this,"sendEvent",["mute",""+e],t),t.muted!=e&&"third"==t.isActive)t.muted=e,g(t._elem,"volumechange")}else if(i.muted.prop._supset)return i.muted.prop._supset.apply(this,arguments)});o("currentTime",function(e){var t=m(this);if(t){if(e*=1,!isNaN(e)){t.paused&&(clearTimeout(t.stopPlayPause),t.stopPlayPause=setTimeout(function(){t.paused=!0;t.stopPlayPause=!1},50));D(this,"sendEvent",["SEEK",""+e],t);if(t.paused){0<t.readyState&&(t.currentTime=e,g(t._elem,"timeupdate"));try{t.jwapi.sendEvent("play","false")}catch(n){}}}}else if(i.currentTime.prop._supset)return i.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(e){r[e]={value:function(){var t=m(this);if(t)t.stopPlayPause&&clearTimeout(t.stopPlayPause),D(this,"sendEvent",["play","play"==e],t),setTimeout(function(){"third"==t.isActive&&(t._ppFlag=!0,t.paused!=("play"!=e))&&(t.paused="play"!=e,g(t._elem,e))},1);else if(i[e].prop._supvalue)return i[e].prop._supvalue.apply(this,arguments)}}});c.forEach(s);t.onNodeNamesPropertyModify(n,"controls",function(r,i){var s=m(this);e(this)[i?"addClass":"removeClass"]("webshims-controls");if(s){try{D(this,i?"showControls":"hideControls",[n],s)}catch(o){t.warn("you need to generate a crossdomain.xml")}"audio"==n&&_(s,i);e(s.jwapi).attr("tabindex",i?"0":"-1")}});i=t.defineNodeNameProperties(n,r,"prop")});if(f){var P=e.cleanData,H=e.browser.msie&&9>t.browserVersion,B={object:1,OBJECT:1};e.cleanData=function(e){var t,n,r;if(e&&(n=e.length)&&l)for(t=0;t<n;t++)if(B[e[t].nodeName]){if("sendEvent"in e[t]){l--;try{e[t].sendEvent("play",!1)}catch(i){}}if(H)try{for(r in e[t])"function"==typeof e[t][r]&&(e[t][r]=null)}catch(s){}}return P.apply(this,arguments)}}a||(["poster","src"].forEach(function(e){t.defineNodeNamesProperty("src"==e?["audio","video","source"]:["video"],e,{reflect:!0,propType:"src"})}),["autoplay","controls"].forEach(function(e){t.defineNodeNamesBooleanProperty(["audio","video"],e)}),t.defineNodeNamesProperties(["audio","video"],{HAVE_CURRENT_DATA:{value:2},HAVE_ENOUGH_DATA:{value:4},HAVE_FUTURE_DATA:{value:3},HAVE_METADATA:{value:1},HAVE_NOTHING:{value:0},NETWORK_EMPTY:{value:0},NETWORK_IDLE:{value:1},NETWORK_LOADING:{value:2},NETWORK_NO_SOURCE:{value:3}},"prop"))});