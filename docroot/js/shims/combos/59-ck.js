jQuery.webshims.register("form-extend",function(e,t,n,r,i,s){n=n.Modernizr;i=n.inputtypes;if(n.formvalidation&&!t.bugs.bustedValidity){var o=t.inputTypes,u={};t.addInputType=function(e,t){o[e]=t};t.addValidityRule=function(e,t){u[e]=t};t.addValidityRule("typeMismatch",function(e,t,n,r){if(""===t)return!1;r=r.typeMismatch;"type"in n||(n.type=(e[0].getAttribute("type")||"").toLowerCase());o[n.type]&&o[n.type].mismatch&&(r=o[n.type].mismatch(t,e));return r});var a=s.overrideMessages,f=!i.number||!i.time||!i.range||a,l="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),s=a?["value","checked"]:["value"],c=[],h=function(t,n){if(t){var i=(t.getAttribute&&t.getAttribute("type")||t.type||"").toLowerCase();if(a||o[i])a&&!n&&"radio"==i&&t.name?e(r.getElementsByName(t.name)).each(function(){e.prop(this,"validity")}):e.prop(t,"validity")}},p={};["input","textarea","select"].forEach(function(n){var r=t.defineNodeNameProperty(n,"setCustomValidity",{prop:{value:function(i){var i=i+"",s="input"==n?e(this).getNativeElement()[0]:this;r.prop._supvalue.call(s,i);t.bugs.validationMessage&&t.data(s,"customvalidationMessage",i);f&&(t.data(s,"hasCustomError",!!i),h(s))}}});p[n]=r.prop._supvalue});if(f||a)s.push("min"),s.push("max"),s.push("step"),c.push("input");a&&(s.push("required"),s.push("pattern"),c.push("select"),c.push("textarea"));if(f){var d;c.forEach(function(n){var r=t.defineNodeNameProperty(n,"validity",{prop:{get:function(){if(!d){var i="input"==n?e(this).getNativeElement()[0]:this,s=r.prop._supget.call(i);if(!s)return s;var f={};l.forEach(function(e){f[e]=s[e]});if(!e.prop(i,"willValidate"))return f;d=!0;var c=e(i),h={type:(i.getAttribute&&i.getAttribute("type")||"").toLowerCase(),nodeName:(i.nodeName||"").toLowerCase()},v=c.val(),m=!!t.data(i,"hasCustomError"),g;d=!1;f.customError=m;if(f.valid&&f.customError)f.valid=!1;else if(!f.valid){var y=!0;e.each(f,function(e,t){if(t)return y=!1});y&&(f.valid=!0)}e.each(u,function(e,r){f[e]=r(c,v,h,f);f[e]&&(f.valid||!g)&&(a||o[h.type]&&o[h.type].mismatch)&&(p[n].call(i,t.createValidationMessage(i,e)),f.valid=!1,g=!0)});f.valid?(p[n].call(i,""),t.data(i,"hasCustomError",!1)):a&&!g&&!m&&e.each(f,function(e,r){if("valid"!==e&&r)return p[n].call(i,t.createValidationMessage(i,e)),!1});return f}},writeable:!1}})});s.forEach(function(e){t.onNodeNamesPropertyModify(c,e,function(){h(this)})});if(r.addEventListener){var v,m=function(t){if("form"in t.target){var n=t.target.form;clearTimeout(v);h(t.target);n&&a&&e("input",n).each(function(){"password"==this.type&&h(this)})}};r.addEventListener("change",m,!0);a&&(r.addEventListener("blur",m,!0),r.addEventListener("keydown",function(e){13==e.keyCode&&m(e)},!0));r.addEventListener("input",function(e){clearTimeout(v);v=setTimeout(function(){h(e.target)},290)},!0)}var g=c.join(",");t.addReady(function(t,n){e(g,t).add(n.filter(g)).each(function(){e.prop(this,"validity")})});a&&t.ready("DOM form-message",function(){t.activeLang({register:"form-core",callback:function(){e("input, select, textarea").getNativeElement().each(function(){if(!t.data(this,"hasCustomError")){var n=this,r=e.prop(n,"validity")||{valid:!0},i;r.valid||(i=(n.nodeName||"").toLowerCase(),e.each(r,function(e,r){if("valid"!==e&&r)return p[i].call(n,t.createValidationMessage(n,e)),!1}))}})}})})}t.defineNodeNameProperty("input","type",{prop:{get:function(){var e=(this.getAttribute("type")||"").toLowerCase();return t.inputTypes[e]?e:this.type}}})}});(function(e){var t=window.Modernizr,n=e.webshims,r=n.bugs,i=e('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required="" /><input required="" name="a" /></form>'),s=function(){if(i[0].querySelector)try{r.findRequired=!i[0].querySelector("select:required")}catch(e){r.findRequired=!1}},o=e("input",i).eq(0),u=function(e){n.loader.loadList(["dom-extend"]);n.ready("dom-extend",e)};r.findRequired=!1;r.validationMessage=!1;n.capturingEventPrevented=function(t){if(!t._isPolyfilled){var n=t.isDefaultPrevented,r=t.preventDefault;t.preventDefault=function(){clearTimeout(e.data(t.target,t.type+"DefaultPrevented"));e.data(t.target,t.type+"DefaultPrevented",setTimeout(function(){e.removeData(t.target,t.type+"DefaultPrevented")},30));return r.apply(this,arguments)};t.isDefaultPrevented=function(){return!!n.apply(this,arguments)||!!e.data(t.target,t.type+"DefaultPrevented")};t._isPolyfilled=!0}};if(!t.formvalidation||r.bustedValidity)s();else{n.capturingEvents(["input"]);n.capturingEvents(["invalid"],!0);if(window.opera||window.testGoodWithFix)i.appendTo("head"),s(),r.validationMessage=!o.prop("validationMessage"),n.reTest(["form-extend","form-message"]),i.remove(),e(function(){u(function(){var t=function(e){e.preventDefault()};["form","input","textarea","select"].forEach(function(r){var i=n.defineNodeNameProperty(r,"checkValidity",{prop:{value:function(){n.fromSubmit||e(this).on("invalid.checkvalidity",t);n.fromCheckValidity=!0;var r=i.prop._supvalue.apply(this,arguments);n.fromSubmit||e(this).unbind("invalid.checkvalidity",t);n.fromCheckValidity=!1;return r}}})})})});e.browser.webkit&&!n.bugs.bustedValidity&&function(){var t=/^(?:textarea|input)$/i,n=!1;document.addEventListener("contextmenu",function(e){t.test(e.target.nodeName||"")&&(n=e.target.form)&&setTimeout(function(){n=!1},1)},!1);e(window).on("invalid",function(e){e.originalEvent&&n&&n==e.target.form&&(e.wrongWebkitInvalid=!0,e.stopImmediatePropagation())})}()}})(jQuery);jQuery.webshims.register("form-core",function(e,t,n,r,i,s){var o={radio:1},u={checkbox:1,radio:1},a=e([]),f=t.bugs,l=function(t){var t=e(t),n,i;n=a;o[t[0].type]&&(i=t.prop("form"),n=(n=t[0].name)?i?e(i[n]):e(r.getElementsByName(n)).filter(function(){return!e.prop(this,"form")}):t,n=n.filter('[type="radio"]'));return n},c=t.getContentValidationMessage=function(t,n,r){var i=e(t).data("errormessage")||t.getAttribute("x-moz-errormessage")||"";r&&i[r]&&(i=i[r]);"object"==typeof i&&(n=n||e.prop(t,"validity")||{valid:1},n.valid||e.each(n,function(e,t){if(t&&"valid"!=e&&i[e])return i=i[e],!1}));"object"==typeof i&&(i=i.defaultMessage);return i||""},h={number:1,range:1,date:1},p=function(t){var n=!1;e(e.prop(t,"elements")).each(function(){if(n=e(this).is(":invalid"))return!1});return n};e.extend(e.expr[":"],{"valid-element":function(t){return e.nodeName(t,"form")?!p(t):!!e.prop(t,"willValidate")&&!!v(t)},"invalid-element":function(t){return e.nodeName(t,"form")?p(t):!!e.prop(t,"willValidate")&&!v(t)},"required-element":function(t){return!!e.prop(t,"willValidate")&&!!e.prop(t,"required")},"user-error":function(t){return e.prop(t,"willValidate")&&e(t).hasClass("user-error")},"optional-element":function(t){return!!e.prop(t,"willValidate")&&!1===e.prop(t,"required")},"in-range":function(t){if(!h[e.prop(t,"type")]||!e.prop(t,"willValidate"))return!1;t=e.prop(t,"validity");return!(!t||t.rangeOverflow||t.rangeUnderflow)},"out-of-range":function(t){if(!h[e.prop(t,"type")]||!e.prop(t,"willValidate"))return!1;t=e.prop(t,"validity");return!(!t||!t.rangeOverflow&&!t.rangeUnderflow)}});["valid","invalid","required","optional"].forEach(function(t){e.expr[":"][t]=e.expr.filters[t+"-element"]});e.expr[":"].focus=function(e){try{var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())}catch(n){}return!1};var d=e.event.customEvent||{},v=function(t){return(e.prop(t,"validity")||{valid:1}).valid};(f.bustedValidity||f.findRequired)&&function(){var t=e.find,n=e.find.matchesSelector,i=/(\:valid|\:invalid|\:optional|\:required|\:in-range|\:out-of-range)(?=[\s\[\~\.\+\>\:\#*]|$)/ig,s=function(e){return e+"-element"};e.find=function(){var e=Array.prototype.slice,n=function(n){var r=arguments,r=e.call(r,1,r.length);r.unshift(n.replace(i,s));return t.apply(this,r)},r;for(r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n}();if(!Modernizr.prefixed||Modernizr.prefixed("matchesSelector",r.documentElement))e.find.matchesSelector=function(e,t){t=t.replace(i,s);return n.call(this,e,t)}}();var m=e.prop,g={selectedIndex:1,value:1,checked:1,disabled:1,readonly:1};e.prop=function(t,n,r){var s=m.apply(this,arguments);t&&"form"in t&&g[n]&&r!==i&&e(t).hasClass(w)&&v(t)&&(e(t).getShadowElement().removeClass(E),"checked"==n&&r&&l(t).not(t).removeClass(E).removeAttr("aria-invalid"));return s};var y=function(t,n){var r;e.each(t,function(t,i){if(i)return r="customError"==t?e.prop(n,"validationMessage"):t,!1});return r},b=function(e){var t;try{t=r.activeElement.name===e}catch(n){}return t},w="user-error",E="user-error form-ui-invalid";e(r).on(s.validityUIEvents||"focusout change refreshvalidityui",function(t){var n,r;if(t.target&&(n=e(t.target).getNativeElement()[0],"submit"!=n.type&&e.prop(n,"willValidate"))){r=e.data(n,"webshimsswitchvalidityclass");var i=function(){if("focusout"!=t.type||"radio"!=n.type||!b(n.name)){var r=e.prop(n,"validity"),i=e(n).getShadowElement(),s,o,a,f;e(n).trigger("refreshCustomValidityRules");r.valid?i.hasClass("user-success")||(s="user-success form-ui-valid",o=E,f="changedvaliditystate",a="changedvalid",u[n.type]&&n.checked&&l(n).not(n).removeClass(o).addClass(s).removeAttr("aria-invalid"),e.removeData(n,"webshimsinvalidcause")):(r=y(r,n),e.data(n,"webshimsinvalidcause")!=r&&(e.data(n,"webshimsinvalidcause",r),f="changedvaliditystate"),i.hasClass(w)||(s=E,o="user-success form-ui-valid",u[n.type]&&!n.checked&&l(n).not(n).removeClass(o).addClass(s),a="changedinvalid"));s&&(i.addClass(s).removeClass(o),setTimeout(function(){e(n).trigger(a)},0));f&&setTimeout(function(){e(n).trigger(f)},0);e.removeData(t.target,"webshimsswitchvalidityclass")}};r&&clearTimeout(r);"refreshvalidityui"==t.type?i():e.data(n,"webshimsswitchvalidityclass",setTimeout(i,9))}});d.changedvaliditystate=!0;d.refreshCustomValidityRules=!0;d.changedvalid=!0;d.changedinvalid=!0;d.refreshvalidityui=!0;t.triggerInlineForm=function(t,n){e(t).trigger(n)};t.modules["form-core"].getGroupElements=l;f=function(){t.scrollRoot=e.browser.webkit||"BackCompat"==r.compatMode?e(r.body):e(r.documentElement)};f();t.ready("DOM",f);t.getRelOffset=function(t,n){var t=e(t),r=e(n).offset(),i;e.swap(e(t)[0],{visibility:"hidden",display:"inline-block",left:0,top:0},function(){i=t.offset()});r.top-=i.top;r.left-=i.left;return r};t.validityAlert=function(){var i=!e.browser.msie||7<parseInt(e.browser.version,10)?"span":"label",s,o=!1,u=!1,a,f={hideDelay:5e3,showFor:function(t,r,i,s){f._create();var t=e(t),l=e(t).getShadowElement(),c=f.getOffsetFromBody(l);f.clear();s?this.hide():(this.getMessage(t,r),this.position(l,c),this.show(),this.hideDelay&&(o=setTimeout(a,this.hideDelay)),e(n).on("resize.validityalert",function(){clearTimeout(u);u=setTimeout(function(){f.position(l)},9)}));i||this.setFocus(l,c)},getOffsetFromBody:function(e){return t.getRelOffset(s,e)},setFocus:function(n,o){var u=e(n).getShadowFocusElement(),f=t.scrollRoot.scrollTop(),l=(o||u.offset()).top-30,c;t.getID&&"label"==i&&s.attr("for",t.getID(u));f>l&&(t.scrollRoot.animate({scrollTop:l-5},{queue:!1,duration:Math.max(Math.min(600,1.5*(f-l)),80)}),c=!0);try{u[0].focus()}catch(h){}c&&(t.scrollRoot.scrollTop(f),setTimeout(function(){t.scrollRoot.scrollTop(f)},0));setTimeout(function(){e(r).on("focusout.validityalert",a)},10)},getMessage:function(t,n){n||(n=c(t[0])||t.prop("validationMessage"));n?e("span.va-box",s).text(n):this.hide()},position:function(t,n){n=n?e.extend({},n):f.getOffsetFromBody(t);n.top+=t.outerHeight();s.css(n)},show:function(){"none"===s.css("display")&&s.css({opacity:0}).show();s.addClass("va-visible").fadeTo(400,1)},hide:function(){s.removeClass("va-visible").fadeOut()},clear:function(){clearTimeout(!1);clearTimeout(o);e(r).unbind(".validityalert");e(n).unbind(".validityalert");s.stop().removeAttr("for")},_create:function(){s||(s=f.errorBubble=e("<"+i+' class="validity-alert-wrapper" role="alert"><span  class="validity-alert"><span class="va-arrow"><span class="va-arrow-box"></span></span><span class="va-box"></span></span></'+i+">").css({position:"absolute",display:"none"}),t.ready("DOM",function(){s.appendTo("body");e.fn.bgIframe&&e.browser.msie&&7>parseInt(e.browser.version,10)&&s.bgIframe()}))}};a=e.proxy(f,"hide");return f}();(function(){var t,n=[],i;e(r).on("invalid",function(s){if(!s.wrongWebkitInvalid){var o=e(s.target),u=o.getShadowElement();u.hasClass(w)||(u.addClass(E).removeClass("user-success form-ui-valid"),setTimeout(function(){e(s.target).trigger("changedinvalid").trigger("changedvaliditystate")},0));t||(t=e.Event("firstinvalid"),t.isInvalidUIPrevented=s.isDefaultPrevented,u=e.Event("firstinvalidsystem"),e(r).triggerHandler(u,{element:s.target,form:s.target.form,isInvalidUIPrevented:s.isDefaultPrevented}),o.trigger(t));t&&t.isDefaultPrevented()&&s.preventDefault();n.push(s.target);s.extraData="fix";clearTimeout(i);i=setTimeout(function(){var r={type:"lastinvalid",cancelable:!1,invalidlist:e(n)};t=!1;n=[];e(s.target).trigger(r,r)},9);u=o=null}})})();e.fn.getErrorMessage=function(){var t="",n=this[0];n&&(t=c(n)||e.prop(n,"customValidationMessage")||e.prop(n,"validationMessage"));return t};s.replaceValidationUI&&t.ready("DOM forms",function(){e(r).on("firstinvalid",function(t){t.isInvalidUIPrevented()||(t.preventDefault(),e.webshims.validityAlert.showFor(t.target,e(t.target).prop("customValidationMessage")))})})});jQuery.webshims.register("form-message",function(e,t,n,r,i,s){var o=t.validityMessages,n=s.overrideMessages||s.customMessages?["customValidationMessage"]:[];o.en=e.extend(!0,{typeMismatch:{email:"Please enter an email address.",url:"Please enter a URL.",number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},stepMismatch:"Invalid input.",tooLong:"Please enter at most {%maxlength} character(s). You entered {%valueLen}.",patternMismatch:"Invalid input. {%title}",valueMissing:{defaultMessage:"Please fill out this field.",checkbox:"Please check this box if you want to proceed."}},o.en||o["en-US"]||{});["select","radio"].forEach(function(e){o.en.valueMissing[e]="Please select an option."});["date","time","datetime-local"].forEach(function(e){o.en.rangeUnderflow[e]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(e){o.en.rangeOverflow[e]="Value must be at or before {%max}."});o["en-US"]=o["en-US"]||o.en;o[""]=o[""]||o["en-US"];o.de=e.extend(!0,{typeMismatch:{email:"{%value} ist keine zulässige E-Mail-Adresse",url:"{%value} ist keine zulässige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen können."},rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen können."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zulässig. Hier sind nur bestimmte Werte zulässig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat für dieses Eingabefeld ein falsches Format! {%title}",valueMissing:{defaultMessage:"Bitte geben Sie einen Wert ein",checkbox:"Bitte aktivieren Sie das Kästchen"}},o.de||{});["select","radio"].forEach(function(e){o.de.valueMissing[e]="Bitte wählen Sie eine Option aus"});["date","time","datetime-local"].forEach(function(e){o.de.rangeUnderflow[e]="{%value} ist zu früh. {%min} ist die früheste Zeit, die Sie benutzen können."});["date","time","datetime-local"].forEach(function(e){o.de.rangeOverflow[e]="{%value} ist zu spät. {%max} ist die späteste Zeit, die Sie benutzen können."});var u=o[""];t.createValidationMessage=function(n,r){var i=u[r];i&&"string"!=typeof i&&(i=i[e.prop(n,"type")]||i[(n.nodeName||"").toLowerCase()]||i.defaultMessage);i&&"value,min,max,title,maxlength,label".split(",").forEach(function(s){if(-1!==i.indexOf("{%"+s)){var o=("label"==s?e.trim(e('label[for="'+n.id+'"]',n.form).text()).replace(/\*$|:$/,""):e.attr(n,s))||"";"patternMismatch"==r&&"title"==s&&!o&&t.error("no title for patternMismatch provided. Always add a title attribute.");i=i.replace("{%"+s+"}",o);"value"==s&&(i=i.replace("{%valueLen}",o.length))}});return i||""};(t.bugs.validationMessage||!Modernizr.formvalidation||t.bugs.bustedValidity)&&n.push("validationMessage");t.activeLang({langObj:o,module:"form-core",callback:function(e){u=e}});n.forEach(function(n){t.defineNodeNamesProperty(["fieldset","output","button"],n,{prop:{value:"",writeable:!1}});["input","select","textarea"].forEach(function(r){var i=t.defineNodeNameProperty(r,n,{prop:{get:function(){var n=this,r="";if(!e.prop(n,"willValidate"))return r;var s=e.prop(n,"validity")||{valid:1};if(s.valid||(r=t.getContentValidationMessage(n,s)))return r;if(s.customError&&n.nodeName&&(r=Modernizr.formvalidation&&!t.bugs.bustedValidity&&i.prop._supget?i.prop._supget.call(n):t.data(n,"customvalidationMessage")))return r;e.each(s,function(e,i){if("valid"!=e&&i&&(r=t.createValidationMessage(n,e)))return!1});return r||""},writeable:!1}})})})});jQuery.webshims.register("form-datalist",function(e,t,n,r,i){t.propTypes.element=function(n){t.createPropDefault(n,"attr");n.prop||(n.prop={get:function(){var t=n.attr.get.call(this);t&&(t=r.getElementById(t))&&n.propNodeName&&!e.nodeName(t,n.propNodeName)&&(t=null);return t||null},writeable:!1})};(function(){var s=e.webshims.cfg.forms,o=Modernizr.input.list;if(!o||s.customDatalist){var u=0,p={submit:1,button:1,reset:1,hidden:1,range:1,date:1},d=e.browser.msie&&7>parseInt(e.browser.version,10),v={},m=function(e){if(!e)return[];if(v[e])return v[e];var t;try{t=JSON.parse(localStorage.getItem("storedDatalistOptions"+e))}catch(n){}v[e]=t||[];return t||[]},g={_create:function(t){if(!p[e.prop(t.input,"type")]){var r=t.datalist,i=e.data(t.input,"datalistWidget");if(r&&i&&i.datalist!==r)i.datalist=r,i.id=t.id,i.shadowList.prop("className","datalist-polyfill "+(i.datalist.className||"")+" "+i.datalist.id+"-shadowdom"),s.positionDatalist?i.shadowList.insertAfter(t.input):i.shadowList.appendTo("body"),e(i.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget",e.proxy(i,"_resetListCached")),i._resetListCached();else if(r){if(!i||i.datalist!==r){u++;var o=this;this.hideList=e.proxy(o,"hideList");this.timedHide=function(){clearTimeout(o.hideTimer);o.hideTimer=setTimeout(o.hideList,9)};this.datalist=r;this.id=t.id;this.hasViewableData=!0;this._autocomplete=e.attr(t.input,"autocomplete");e.data(t.input,"datalistWidget",this);this.shadowList=e('<div class="datalist-polyfill '+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom" />');s.positionDatalist||e(t.input).hasClass("position-datalist")?this.shadowList.insertAfter(t.input):this.shadowList.appendTo("body");this.index=-1;this.input=t.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(n){var r=e("li:not(.hidden-item)",o.shadowList),i="mousedown"==n.type||"click"==n.type;o.markItem(r.index(n.currentTarget),i,r);"click"==n.type&&(o.hideList(),s.customDatalist&&e(t.input).trigger("datalistselect"));return"mousedown"!=n.type}).on("focusout",this.timedHide);t.input.setAttribute("autocomplete","off");e(t.input).attr({"aria-haspopup":"true"}).on({"input.datalistWidget":function(){o.triggeredByDatalist||(o.changedValue=!1,o.showHideOptions())},"keydown.datalistWidget":function(n){var r=n.keyCode,i;if(40==r&&!o.showList())return o.markItem(o.index+1,!0),!1;if(o.isListVisible){if(38==r)return o.markItem(o.index-1,!0),!1;if(!n.shiftKey&&(33==r||36==r))return o.markItem(0,!0),!1;if(!n.shiftKey&&(34==r||35==r))return n=e("li:not(.hidden-item)",o.shadowList),o.markItem(n.length-1,!0,n),!1;if(13==r||27==r)return 13==r&&(i=e("li.active-item:not(.hidden-item)",o.shadowList),o.changeValue(e("li.active-item:not(.hidden-item)",o.shadowList))),o.hideList(),s.customDatalist&&i&&i[0]&&e(t.input).trigger("datalistselect"),!1}},"focus.datalistWidget":function(){e(this).hasClass("list-focus")&&o.showList()},"mousedown.datalistWidget":function(){e(this).is(":focus")&&o.showList()},"blur.datalistWidget":this.timedHide});e(this.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget",e.proxy(this,"_resetListCached"));this._resetListCached();t.input.form&&(t.input.name||t.input.id)&&e(t.input.form).on("submit.datalistWidget"+t.input.id,function(){if(!e(t.input).hasClass("no-datalist-cache")&&"off"!=o._autocomplete){var n=e.prop(t.input,"value"),r=(t.input.name||t.input.id)+e.prop(t.input,"type");o.storedOptions||(o.storedOptions=m(r));if(n&&-1==o.storedOptions.indexOf(n)&&(o.storedOptions.push(n),n=o.storedOptions,r)){n=n||[];try{localStorage.setItem("storedDatalistOptions"+r,JSON.stringify(n))}catch(i){}}}});e(n).on("unload.datalist"+this.id+" beforeunload.datalist"+this.id,function(){o.destroy()})}}else i&&i.destroy()}},destroy:function(){var t=e.attr(this.input,"autocomplete");e(this.input).off(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();e(r).off(".datalist"+this.id);e(n).off(".datalist"+this.id);this.input.form&&this.input.id&&e(this.input.form).off("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");t===i?this.input.removeAttribute("autocomplete"):e(this.input).attr("autocomplete",t)},_resetListCached:function(e){var i=this,s;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";this.updateTimer||(n.QUnit||(s=e&&r.activeElement==i.input)?i.updateListOptions(s):t.ready("WINDOWLOAD",function(){i.updateTimer=setTimeout(function(){i.updateListOptions();i=null;u=1},200+100*u)}))},maskHTML:function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")},updateListOptions:function(t){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:e.css(this.input,"fontSize"),fontFamily:e.css(this.input,"fontFamily")});this.searchStart=s.customDatalist&&e(this.input).hasClass("search-start");var n=[],r=[],i=[],o,u,f,l;for(u=e.prop(this.datalist,"options"),f=0,l=u.length;f<l;f++){o=u[f];if(o.disabled)return;o={value:e(o).val()||"",text:e.trim(e.attr(o,"label")||o.textContent||o.innerText||e.text([o])||""),className:o.className||"",style:e.attr(o,"style")||""};o.text?o.text!=o.value&&(o.className+=" different-label-value"):o.text=o.value;r[f]=o.value;i[f]=o}this.storedOptions||(this.storedOptions=e(this.input).hasClass("no-datalist-cache")||"off"==this._autocomplete?[]:m((this.input.name||this.input.id)+e.prop(this.input,"type")));this.storedOptions.forEach(function(e){-1==r.indexOf(e)&&i.push({value:e,text:e,className:"stored-suggest",style:""})});for(f=0,l=i.length;f<l;f++)u=i[f],n[f]='<li class="'+u.className+'" style="'+u.style+'" tabindex="-1" role="listitem"><span class="option-label">'+this.maskHTML(u.text)+'</span> <span class="option-value">'+this.maskHTML(u.value)+"</span></li>";this.arrayOptions=i;this.shadowList.html('<div class="datalist-outer-box"><div class="datalist-box"><ul role="list">'+n.join("\n")+"</ul></div></div>");e.fn.bgIframe&&d&&this.shadowList.bgIframe();(t||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(t){var n=e.prop(this.input,"value").toLowerCase();if(!(n===this.lastUpdatedValue||this.lastUnfoundValue&&0===n.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=n;var r=!1,i=this.searchStart,s=e("li",this.shadowList);n?this.arrayOptions.forEach(function(t,o){var u;"lowerText"in t||(t.lowerText=t.text!=t.value?t.value.toLowerCase()+t.text.toLowerCase():t.text.toLowerCase());u=t.lowerText.indexOf(n);(u=i?!u:-1!==u)?(e(s[o]).removeClass("hidden-item"),r=!0):e(s[o]).addClass("hidden-item")}):s.length&&(s.removeClass("hidden-item"),r=!0);this.hasViewableData=r;!t&&r&&this.showList();r||(this.lastUnfoundValue=n,this.hideList())}},setPos:function(){this.shadowList.css({marginTop:0,marginLeft:0,marginRight:0,marginBottom:0});var n=s.positionDatalist?e(this.input).position():t.getRelOffset(this.shadowList,this.input);n.top+=e(this.input).outerHeight();n.width=e(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css({marginTop:"",marginLeft:"",marginRight:"",marginBottom:""}).css(n);return n},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var t=this;t.setPos();t.shadowList.addClass("datalist-visible").find("li.active-item").removeClass("active-item");e(n).unbind(".datalist"+t.id);e(r).off(".datalist"+t.id).on("mousedown.datalist"+t.id+" focusin.datalist"+t.id,function(n){n.target===t.input||t.shadowList[0]===n.target||e.contains(t.shadowList[0],n.target)?(clearTimeout(t.hideTimer),setTimeout(function(){clearTimeout(t.hideTimer)},9)):t.timedHide()}).on("updateshadowdom.datalist"+t.id,function(){t.setPos()});return!0},hideList:function(){if(!this.isListVisible)return!1;var i=this,s=function(){i.changedValue&&e(i.input).trigger("change");i.changedValue=!1};i.shadowList.removeClass("datalist-visible list-item-active");i.index=-1;i.isListVisible=!1;if(i.changedValue){i.triggeredByDatalist=!0;t.triggerInlineForm&&t.triggerInlineForm(i.input,"input");e(i.input).is(":focus")?e(i.input).one("blur",s):s();i.triggeredByDatalist=!1}e(r).unbind(".datalist"+i.id);e(n).off(".datalist"+i.id).one("resize.datalist"+i.id,function(){i.shadowList.css({top:0,left:0})});return!0},scrollIntoView:function(t){var n=e("ul",this.shadowList),r=e("div.datalist-box",this.shadowList),i=t.position();i.top-=(parseInt(n.css("paddingTop"),10)||0)+(parseInt(n.css("marginTop"),10)||0)+(parseInt(n.css("borderTopWidth"),10)||0);0>i.top?r.scrollTop(r.scrollTop()+i.top-2):(i.top+=t.outerHeight(),t=r.height(),i.top>t&&r.scrollTop(r.scrollTop()+(i.top-t)+2))},changeValue:function(t){if(t[0]){var t=e("span.option-value",t).text(),n=e.prop(this.input,"value");t!=n&&(e(this.input).prop("value",t).triggerHandler("updateInput"),this.changedValue=!0)}},markItem:function(t,n,r){r=r||e("li:not(.hidden-item)",this.shadowList);r.length&&(0>t?t=r.length-1:t>=r.length&&(t=0),r.removeClass("active-item"),this.shadowList.addClass("list-item-active"),r=r.filter(":eq("+t+")").addClass("active-item"),n&&(this.changeValue(r),this.scrollIntoView(r)),this.index=t)}};(function(){o||t.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var n=e("select",this);n[0]?n=n[0].options:(n=e("option",this).get(),n.length&&t.warn("you should wrap your option-elements for a datalist in a select element to support IE and other old browsers."));return n}}});var n={autocomplete:{attr:{get:function(){var t=e.data(this,"datalistWidget");return t?t._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(t){var n=e.data(this,"datalistWidget");n?(n._autocomplete=t,"off"==t&&n.hideList()):"autocomplete"in this?this.autocomplete=t:this.setAttribute("autocomplete",t)}}}};o?((e("<datalist><select><option></option></select></datalist>").prop("options")||[]).length||t.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var t=this.options||[];if(!t.length){var n=e("select",this);n[0]&&n[0].options&&n[0].options.length&&(t=n[0].options)}return t}}}),n.list={attr:{get:function(){var n=t.contentAttr(this,"list");null!=n?this.removeAttribute("list"):n=e.data(this,"datalistListAttr");return null==n?i:n},set:function(n){e.data(this,"datalistListAttr",n);t.objectCreate(g,i,{input:this,id:n,datalist:e.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}):n.list={attr:{get:function(){var e=t.contentAttr(this,"list");return null==e?i:e},set:function(n){t.contentAttr(this,"list",n);t.objectCreate(g,i,{input:this,id:n,datalist:e.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"};t.defineNodeNameProperties("input",n);e.event.customEvent&&(e.event.customEvent.updateDatalist=!0,e.event.customEvent.updateInput=!0,e.event.customEvent.datalistselect=!0);t.addReady(function(e,t){t.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})})()}})()});