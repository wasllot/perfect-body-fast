/*! For license information please see custom.js.LICENSE.txt */
(()=>{var __webpack_modules__={4532:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var source=null,jsrender=__webpack_require__(2743);function deleteItemAjax(url,tableId,header){var callFunction=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;$.ajax({url,type:"DELETE",dataType:"json",success:function success(obj){obj.success&&(1==$(tableId).DataTable().data().count()?$(tableId).DataTable().page("previous").draw("page"):$(tableId).DataTable().ajax.reload(null,!1)),Swal.fire({title:"Deleted!",text:header+" has been deleted.",icon:"success",confirmButtonColor:"#266CB0",timer:2e3}),callFunction&&eval(callFunction)},error:function(e){Swal.fire({title:"Error",icon:"error",text:e.responseJSON.message,type:"error",confirmButtonColor:"#266CB0",timer:5e3})}})}$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}}),$(document).ajaxComplete((function(){$('[data-toggle="tooltip"]').tooltip({html:!0,offset:10})})),$(document).on("select2:open",(function(){var e=document.querySelectorAll(".select2-container--open .select2-search__field");e[e.length-1].focus()})),$(document).on("focus",".select2.select2-container",(function(e){var t=e.originalEvent,n=$(this).find(".select2-selection--single").length>0;t&&n&&$(this).siblings("select:enabled").select2("open")})),isSetFirstFocus&&$('input:text:not([readonly="readonly"])').first().focus(),$((function(){$(".modal").on("shown.bs.modal",(function(){"modal fade event-modal show"!=$(this).attr("class")&&$(this).find("input:text,input:password").first().focus()}))})),toastr.options={closeButton:!0,debug:!1,newestOnTop:!1,progressBar:!0,positionClass:"toast-top-right",preventDuplicates:!1,onclick:null,showDuration:"300",hideDuration:"1000",timeOut:"5000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},window.resetModalForm=function(e,t){$(e)[0].reset(),$("select.select2Selector").each((function(e,t){var n="#"+$(this).attr("id");$(n).val(""),$(n).trigger("change")})),$(t).hide()},window.printErrorMessage=function(e,t){$(e).show().html(""),$(e).text(t.responseJSON.message)},window.manageAjaxErrors=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"editValidationErrorsBox";404==e.status?toastr.error(e.responseJSON.message):printErrorMessage("#"+t,e)},window.displaySuccessMessage=function(e){toastr.success(e)},window.displayErrorMessage=function(e){toastr.error(e)},window.deleteItem=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;Swal.fire({title:"Delete !",text:'Are you sure want to delete this "'+n+'" ?',type:"warning",icon:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonColor:"#266CB0",showLoaderOnConfirm:!0,cancelButtonText:"No, Cancel",confirmButtonText:"Yes, Delete!"}).then((function(o){o.isConfirmed&&deleteItemAjax(e,t,n,r)}))},window.format=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD-MMM-YYYY";return moment(e).format(t)},window.processingBtn=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=$(e).find(t);"loading"===n?r.button("loading"):r.button("reset")},window.prepareTemplateRender=function(e,t){return jsrender.templates(e).render(t)},window.isValidFile=function(e,t){var n=$(e).val().split(".").pop().toLowerCase();return-1==$.inArray(n,["gif","png","jpg","jpeg"])?($(e).val(""),$(t).removeClass("d-none"),$(t).html("The image must be a file of type: jpeg, jpg, png.").show(),$(t).delay(5e3).slideUp(300),!1):($(t).hide(),!0)},window.displayPhoto=function(e,t){var n=!0;if(e.files&&e.files[0]){var r=new FileReader;if(r.onload=function(e){var r=new Image;r.src=e.target.result,r.onload=function(){$(t).attr("src",e.target.result),n=!0}},e.files[0].size>2097152)return displayErrorMessage("Icon size should be less than 2 MB"),!1;n&&(r.readAsDataURL(e.files[0]),$(t).show())}},window.removeCommas=function(e){return e.replace(/,/g,"")},window.DatetimepickerDefaults=function(e){return $.extend({},{sideBySide:!0,ignoreReadonly:!0,icons:{close:"fa fa-times",time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-arrow-up",down:"fa fa-arrow-down",previous:"fa fa-chevron-left",next:"fa fa-chevron-right",today:"fa fa-clock-o",clear:"fa fa-trash-o"}},e)},window.isEmpty=function(e){return null==e||""===e},window.screenLock=function(){$("#overlay-screen-lock").show(),$("body").css({"pointer-events":"none",opacity:"0.6"})},window.screenUnLock=function(){$("body").css({"pointer-events":"auto",opacity:"1"}),$("#overlay-screen-lock").hide()},window.onload=function(){window.startLoader=function(){$(".infy-loader").show()},window.stopLoader=function(){$(".infy-loader").hide()},stopLoader()},window.setBtnLoader=function(e){if(e.attr("data-old-text"))return e.html(e.attr("data-old-text")).prop("disabled",!1),void e.removeAttr("data-old-text");e.attr("data-old-text",e.text()),e.html('<i class="icon-line-loader icon-spin m-0"></i>').prop("disabled",!0)},window.setAdminBtnLoader=function(e){if(e.attr("data-old-text"))return e.html(e.attr("data-old-text")).prop("disabled",!1),void e.removeAttr("data-old-text");e.attr("data-old-text",e.text()),e.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').prop("disabled",!0)},$(document).ready((function(){$(document).find(".nav-item.dropdown ul li").hasClass("active")&&($(document).find(".nav-item.dropdown ul li.active").parent("ul").css("display","block"),$(document).find(".nav-item.dropdown ul li.active").parent("ul").parent("li").addClass("active"))})),window.urlValidation=function(e,t){return!(""!=e&&!e.match(t))},$(".languageSelection").on("click",(function(){var e=$(this).data("prefix-value");$.ajax({type:"POST",url:"/change-language",data:{languageName:e},success:function(){location.reload()}})})),$(window).width()>992&&$(".no-hover").on("click",(function(){$(this).toggleClass("open")})),$("#register").on("click",(function(e){e.preventDefault(),$(".open #dropdownLanguage").trigger("click"),$(".open #dropdownLogin").trigger("click")})),$("#language").on("click",(function(e){e.preventDefault(),$(".open #dropdownRegister").trigger("click"),$(".open #dropdownLogin").trigger("click")})),$("#login").on("click",(function(e){e.preventDefault(),$(".open #dropdownRegister").trigger("click"),$(".open #dropdownLanguage").trigger("click")})),window.checkSummerNoteEmpty=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return $(e).summernote("isEmpty")&&1===n?(displayErrorMessage(t),$(document).find(".note-editable").html("<p><br></p>"),!1):!(!$(e).summernote("isEmpty")&&($(document).find(".note-editable").contents().each((function(){3===this.nodeType&&(this.textContent=this.textContent.replace(/\u00A0/g,""))})),0==$(document).find(".note-editable").text().trim().length&&($(document).find(".note-editable").html("<p><br></p>"),$(e).val(null),1===n)))||(displayErrorMessage(t),!1)},window.preparedTemplate=function(){var e=$("#actionTemplate").html();window.preparedTemplate=Handlebars.compile(e)},window.ajaxCallInProgress=function(){ajaxCallIsRunning=!0},window.ajaxCallCompleted=function(){ajaxCallIsRunning=!1},window.avoidSpace=function(e){if(32==(e?e.which:window.event.keyCode))return!1},$(document).on("click","#readNotification",(function(e){e.preventDefault(),e.stopPropagation();var t=$(this).data("id"),n=$(this);$.ajax({type:"POST",url:route("notifications.read",t),data:{notificationId:t},success:function(){var e=parseInt($("#header-notification-counter").text());$("#header-notification-counter").text(e-1),n.remove();var t=document.getElementsByClassName("readNotification").length;$("#counter").text(t),0==t&&($(".notification-message-counter").addClass("d-none"),$("#readAllNotification").addClass("d-none"),$(".empty-state").removeClass("d-none"),$(".notification-toggle").removeClass("beep")),displaySuccessMessage("Notification read successfully.")},error:function(e){manageAjaxErrors(e)}})})),$(document).on("click","#readAllNotification",(function(e){e.preventDefault(),e.stopPropagation(),$.ajax({type:"POST",url:route("notifications.read.all"),success:function(){$(".notification-message-counter").text(0),$(".notification-message-counter").addClass("d-none"),$(".readNotification").remove(),$("#readAllNotification").addClass("d-none"),$(".empty-state").removeClass("d-none"),$(".notification-toggle").removeClass("beep"),displaySuccessMessage("Notification read successfully.")},error:function(e){manageAjaxErrors(e)}})})),window.calculateAvgRating=function(e){var t=e.length,n=0;$(e).each((function(e,t){n+=t.rating}));var r=n/t/5*100;return r||0}},2743:e=>{!function(t,n){var r=n.jQuery;e.exports=r?t(n,r):function(e){if(e&&!e.fn)throw"Provide jQuery or null";return t(n,e)}}((function(e,t){"use strict";var n=!1===t;t=t&&t.fn?t:e.jQuery;var r,o,i,a,s,l,c,d,u,p,f,g,_,m,h,v,w,b,x,y,k,$,C="v1.0.11",j="_ocp",T=/[ \t]*(\r\n|\n|\r)/g,A=/\\(['"\\])/g,O=/['"\\]/g,E=/(?:\x08|^)(onerror:)?(?:(~?)(([\w$.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,N=/^if\s/,M=/<(\w+)[>\s]/,S=/[\x00`><\"'&=]/,q=/^on[A-Z]|^convert(Back)?$/,P=/^\#\d+_`[\s\S]*\/\d+_`$/,F=/[\x00`><"'&=]/g,R=/[&<>]/g,I=/&(amp|gt|lt);/g,D=/\[['"]?|['"]?\]/g,V=0,B={"&":"&amp;","<":"&lt;",">":"&gt;","\0":"&#0;","'":"&#39;",'"':"&#34;","`":"&#96;","=":"&#61;"},L={amp:"&",gt:">",lt:"<"},U="html",J="object",K="data-jsv-tmpl",Y="jsvTmpl",H="For #index in nested block use #getIndex().",Q={},z={},W=e.jsrender,X=W&&t&&!t.render,Z={template:{compile:function e(n,r,o,i){function s(r){var a,s;if(""+r===r||r.nodeType>0&&(l=r)){if(!l)if(/^\.?\/[^\\:*?"<>]*$/.test(r))(s=d[n=n||r])?r=s:l=document.getElementById(r);else if("#"===r.charAt(0))l=document.getElementById(r.slice(1));else if(t.fn&&!g.rTmpl.test(r))try{l=t(r,document)[0]}catch(e){}l&&("SCRIPT"!==l.tagName&&ye(r+": Use script block, not "+l.tagName),i?r=l.innerHTML:((a=l.getAttribute(K))&&(a!==Y?(r=d[a],delete d[a]):t.fn&&(r=t.data(l).jsvTmpl)),a&&r||(n=n||(t.fn?Y:r),r=e(n,l.innerHTML,o,i)),r.tmplName=n=n||a,n!==Y&&(d[n]=r),l.setAttribute(K,n),t.fn&&t.data(l,Y,r))),l=void 0}else r.fn||(r=void 0);return r}var l,c,p=r=r||"";g._html=u.html,0===i&&(i=void 0,p=s(p));(i=i||(r.markup?r.bnds?ie({},r):r:{})).tmplName=i.tmplName||n||"unnamed",o&&(i._parentTmpl=o);!p&&r.markup&&(p=s(r.markup))&&p.fn&&(p=p.markup);if(void 0!==p)return p.render||r.render?p.tmpls&&(c=p):(r=me(p,i),$e(p.replace(O,"\\$&"),r)),c||function(e){var t,n,r;for(t in Z)e[n=t+"s"]&&(r=e[n],e[n]={},a[n](r,e))}(c=ie((function(){return c.render.apply(c,arguments)}),r)),c}},tag:{compile:function(e,t,n){var r,o,i,a=new g._tg;function s(){var t=this;t._={unlinked:!0},t.inline=!0,t.tagName=e}l(t)?t={depends:t.depends,render:t}:""+t===t&&(t={template:t});if(o=t.baseTag)for(i in t.flow=!!t.flow,(o=""+o===o?n&&n.tags[o]||f[o]:o)||ye('baseTag: "'+t.baseTag+'" not found'),a=ie(a,o),t)a[i]=ee(o[i],t[i]);else a=ie(a,t);void 0!==(r=a.template)&&(a.template=""+r===r?d[r]||d(r):r);(s.prototype=a).constructor=a._ctr=s,n&&(a._parentTmpl=n);return a}},viewModel:{compile:function(e,n){var r,o,i,a=this,d=n.getters,u=n.extend,p=n.id,f=t.extend({_is:e||"unnamed",unmap:k,merge:y},u),g="",_="",m=d?d.length:0,h=t.observable,v={};function w(e){o.apply(this,e)}function b(){return new w(arguments)}function x(e,t){for(var n,r,o,i,s,l=0;l<m;l++)n=void 0,(o=d[l])+""!==o&&(o=(n=o).getter,s=n.parentRef),void 0===(i=e[o])&&n&&void 0!==(r=n.defaultVal)&&(i=ge(r,e)),t(i,n&&a[n.type],o,s)}function y(e,t,n){e=e+""===e?JSON.parse(e):e;var r,o,i,a,l,d,u,f,g,_,m=0,w=this;if(c(w)){for(u={},g=[],o=e.length,i=w.length;m<o;m++){for(f=e[m],d=!1,r=0;r<i&&!d;r++)u[r]||(l=w[r],p&&(u[r]=d=p+""===p?f[p]&&(v[p]?l[p]():l[p])===f[p]:p(l,f)));d?(l.merge(f),g.push(l)):(g.push(_=b.map(f)),n&&_e(_,n,t))}h?h(w).refresh(g,!0):w.splice.apply(w,[0,w.length].concat(g))}else for(a in x(e,(function(e,t,n,r){t?w[n]().merge(e,w,r):w[n]()!==e&&w[n](e)})),e)a===s||v[a]||(w[a]=e[a])}function k(){var e,t,n,r,o=0,i=this;function u(e){for(var t=[],n=0,r=e.length;n<r;n++)t.push(e[n].unmap());return t}if(c(i))return u(i);for(e={};o<m;o++)n=void 0,(t=d[o])+""!==t&&(t=(n=t).getter),r=i[t](),e[t]=n&&r&&a[n.type]?c(r)?u(r):r.unmap():r;for(t in i)!i.hasOwnProperty(t)||"_"===t.charAt(0)&&v[t.slice(1)]||t===s||l(i[t])||(e[t]=i[t]);return e}for(w.prototype=f,r=0;r<m;r++)!function(e){e=e.getter||e,v[e]=r+1;var t="_"+e;g+=(g?",":"")+e,_+="this."+t+" = "+e+";\n",f[e]=f[e]||function(n){if(!arguments.length)return this[t];h?h(this).setProperty(e,n):this[t]=n},h&&(f[e].set=f[e].set||function(e){this[t]=e})}(d[r]);return _=new Function(g,_),(o=function(){_.apply(this,arguments),(i=arguments[m+1])&&_e(this,arguments[m],i)}).prototype=f,f.constructor=o,b.map=function(t){t=t+""===t?JSON.parse(t):t;var n,r,o,i,a=0,l=t,u=[];if(c(t)){for(n=(t=t||[]).length;a<n;a++)u.push(this.map(t[a]));return u._is=e,u.unmap=k,u.merge=y,u}if(t){for(x(t,(function(e,t){t&&(e=t.map(e)),u.push(e)})),l=this.apply(this,u),a=m;a--;)if(o=u[a],(i=d[a].parentRef)&&o&&o.unmap)if(c(o))for(n=o.length;n--;)_e(o[n],i,l);else _e(o,i,l);for(r in t)r===s||v[r]||(l[r]=t[r])}return l},b.getters=d,b.extend=u,b.id=p,b}},helper:{},converter:{}};function G(e,t){return function(){var n,r=this,o=r.base;return r.base=e,n=t.apply(r,arguments),r.base=o,n}}function ee(e,t){return l(t)&&((t=G(e?e._d?e:G(re,e):re,t))._d=(e&&e._d||0)+1),t}function te(e,t){var n,r=t.props;for(n in r)!q.test(n)||e[n]&&e[n].fix||(e[n]="convert"!==n?ee(e.constructor.prototype[n],r[n]):r[n])}function ne(e){return e}function re(){return""}function oe(e){this.name=(t.link?"JsViews":"JsRender")+" Error",this.message=e||this.name}function ie(e,t){if(e){for(var n in t)e[n]=t[n];return e}}function ae(){var e=this.get("item");return e?e.index:void 0}function se(){return this.index}function le(e,t,n,r){var o,i,a,s=0;if(1===n&&(r=1,n=void 0),t)for(a=(i=t.split(".")).length;e&&s<a;s++)o=e,e=i[s]?e[i[s]]:e;return n&&(n.lt=n.lt||s<a),void 0===e?r?re:"":r?function(){return e.apply(o,arguments)}:e}function ce(n,r,o){var i,a,s,c,d,u,f,_=this,m=!$&&arguments.length>1,h=_.ctx;if(n){if(_._||(d=_.index,_=_.tag),u=_,h&&h.hasOwnProperty(n)||(h=p).hasOwnProperty(n)){if(s=h[n],"tag"===n||"tagCtx"===n||"root"===n||"parentTags"===n)return s}else h=void 0;if((!$&&_.tagCtx||_.linked)&&(s&&s._cxp||(_=_.tagCtx||l(s)?_:!(_=_.scope||_).isTop&&_.ctx.tag||_,void 0!==s&&_.tagCtx&&(_=_.tagCtx.view.scope),h=_._ocps,(s=h&&h.hasOwnProperty(n)&&h[n]||s)&&s._cxp||!o&&!m||((h||(_._ocps=_._ocps||{}))[n]=s=[{_ocp:s,_vw:u,_key:n}],s._cxp={path:j,ind:0,updateValue:function(e,n){return t.observable(s[0]).setProperty(j,e),this}})),c=s&&s._cxp)){if(arguments.length>2)return(a=s[1]?g._ceo(s[1].deps):[j]).unshift(s[0]),a._cxp=c,a;if(d=c.tagElse,f=s[1]?c.tag&&c.tag.cvtArgs?c.tag.cvtArgs(d,1)[c.ind]:s[1](s[0].data,s[0],g):s[0]._ocp,m)return g._ucp(n,r,_,c),_;s=f}return s&&l(s)&&ie(i=function(){return s.apply(this&&this!==e?this:u,arguments)},s),i||s}}function de(e,t){var n,r,o,i,a,s,l,d=this;if(d.tagName){if(!(d=((s=d).tagCtxs||[d])[e||0]))return}else s=d.tag;if(a=s.bindFrom,i=d.args,(l=s.convert)&&""+l===l&&(l="true"===l?void 0:d.view.getRsc("converters",l)||ye("Unknown converter: '"+l+"'")),l&&!t&&(i=i.slice()),a){for(o=[],n=a.length;n--;)r=a[n],o.unshift(ue(d,r));t&&(i=o)}if(l){if(void 0===(l=l.apply(s,o||i)))return i;if(n=(a=a||[0]).length,c(l)&&(!1===l.arg0||1!==n&&l.length===n&&!l.arg0)||(l=[l],a=[0],n=1),t)i=l;else for(;n--;)+(r=a[n])===r&&(i[r]=l[n])}return i}function ue(e,t){return(e=e[+t===t?"args":"props"])&&e[t]}function pe(e){return this.cvtArgs(e,1)}function fe(e,t,n,r,o,i,a,s){var l,c,d,u=this,p="array"===t;u.content=s,u.views=p?[]:{},u.data=r,u.tmpl=o,d=u._={key:0,useKey:p?0:1,id:""+V++,onRender:a,bnds:{}},u.linked=!!a,u.type=t||"top",t&&(u.cache={_ct:_._cchCt}),n&&"top"!==n.type||((u.ctx=e||{}).root=u.data),(u.parent=n)?(u.root=n.root||u,l=n.views,c=n._,u.isTop=c.scp,u.scope=(!e.tag||e.tag===n.ctx.tag)&&!u.isTop&&n.scope||u,c.useKey?(l[d.key="_"+c.useKey++]=u,u.index=H,u.getIndex=ae):l.length===(d.key=u.index=i)?l.push(u):l.splice(i,0,u),u.ctx=e||n.ctx):t&&(u.root=u)}function ge(e,t){return l(e)?e.call(t):e}function _e(e,t,n){Object.defineProperty(e,t,{value:n,configurable:!0})}function me(e,n){var r,o=m._wm||{},i={tmpls:[],links:{},bnds:[],_is:"template",render:be};return n&&(i=ie(i,n)),i.markup=e,i.htmlTag||(r=M.exec(e),i.htmlTag=r?r[1].toLowerCase():""),(r=o[i.htmlTag])&&r!==o.div&&(i.markup=t.trim(i.markup)),i}function he(e,t){var n=e+"s";a[n]=function r(o,i,s){var l,c,d,u=g.onStore[e];if(o&&typeof o===J&&!o.nodeType&&!o.markup&&!o.getTgt&&!("viewModel"===e&&o.getters||o.extend)){for(c in o)r(c,o[c],i);return i||a}return o&&""+o!==o&&(s=i,i=o,o=void 0),d=s?"viewModel"===e?s:s[n]=s[n]||{}:r,l=t.compile,void 0===i&&(i=l?o:d[o],o=void 0),null===i?o&&delete d[o]:(l&&((i=l.call(d,o,i,s,0)||{})._is=e),o&&(d[o]=i)),u&&u(o,i,s,l),i}}function ve(e){h[e]=h[e]||function(t){return arguments.length?(_[e]=t,h):_[e]}}function we(e){function t(t,n){this.tgt=e.getTgt(t,n),n.map=this}return l(e)&&(e={getTgt:e}),e.baseMap&&(e=ie(ie({},e.baseMap),e)),e.map=function(e,n){return new t(e,n)},e}function be(e,t,n,r,o,a){var s,d,u,p,f,_,h,v,w=r,b="";if(!0===t?(n=t,t=void 0):typeof t!==J&&(t=void 0),(u=this.tag)?(f=this,p=(w=w||f.view)._getTmpl(u.template||f.tmpl),arguments.length||(e=u.contentCtx&&l(u.contentCtx)?e=u.contentCtx(e):w)):p=this,p){if(!r&&e&&"view"===e._is&&(w=e),w&&e===w&&(e=w.data),_=!w,$=$||_,_&&((t=t||{}).root=e),!$||m.useViews||p.useViews||w&&w!==i)b=xe(p,e,t,n,w,o,a,u);else{if(w?(h=w.data,v=w.index,w.index=H):(h=(w=i).data,w.data=e,w.ctx=t),c(e)&&!n)for(s=0,d=e.length;s<d;s++)w.index=s,w.data=e[s],b+=p.fn(e[s],w,g);else w.data=e,b+=p.fn(e,w,g);w.data=h,w.index=v}_&&($=void 0)}return b}function xe(e,t,n,r,o,i,a,s){var l,d,u,p,f,_,m,h,v,w,b,x,y,k="";if(s&&(v=s.tagName,x=s.tagCtx,n=n?Oe(n,s.ctx):s.ctx,e===o.content?m=e!==o.ctx._wrp?o.ctx._wrp:void 0:e!==x.content?e===s.template?(m=x.tmpl,n._wrp=x.content):m=x.content||o.content:m=o.content,!1===x.props.link&&((n=n||{}).link=!1)),o&&(a=a||o._.onRender,(y=n&&!1===n.link)&&o._.nl&&(a=void 0),n=Oe(n,o.ctx),x=!s&&o.tag?o.tag.tagCtxs[o.tagElse]:x),(w=x&&x.props.itemVar)&&("~"!==w[0]&&ke("Use itemVar='~myItem'"),w=w.slice(1)),!0===i&&(_=!0,i=0),a&&s&&s._.noVws&&(a=void 0),h=a,!0===a&&(h=void 0,a=o._.onRender),b=n=e.helpers?Oe(e.helpers,n):n,c(t)&&!r)for((u=_?o:void 0!==i&&o||new fe(n,"array",o,t,e,i,a,m))._.nl=y,o&&o._.useKey&&(u._.bnd=!s||s._.bnd&&s,u.tag=s),l=0,d=t.length;l<d;l++)p=new fe(b,"item",u,t[l],e,(i||0)+l,a,u.content),w&&((p.ctx=ie({},b))[w]=g._cp(t[l],"#data",p)),f=e.fn(t[l],p,g),k+=u._.onRender?u._.onRender(f,p):f;else u=_?o:new fe(b,v||"data",o,t,e,i,a,m),w&&((u.ctx=ie({},b))[w]=g._cp(t,"#data",u)),u.tag=s,u._.nl=y,k+=e.fn(t,u,g);return s&&(u.tagElse=x.index,x.contentView=u),h?h(k,u):k}function ye(e){throw new g.Err(e)}function ke(e){ye("Syntax error\n"+e)}function $e(e,t,n,r,i){function a(t){(t-=m)&&y.push(e.substr(m,t).replace(T,"\\n"))}function s(t,n){t&&(t+="}}",ke((n?"{{"+n+"}} block has {{/"+t+" without {{"+t:"Unmatched or missing {{/"+t)+", in template:\n"+e))}var l,c,d,u,p,f=_.allowCode||t&&t.allowCode||!0===h.allowCode,g=[],m=0,w=[],y=g,k=[,,g];if(f&&t._is&&(t.allowCode=f),n&&(void 0!==r&&(e=e.slice(0,-r.length-2)+b),e=v+e+x),s(w[0]&&w[0][2].pop()[0]),e.replace(o,(function(o,l,c,p,g,_,h,v,b,x,$,C){(h&&l||b&&!c||v&&":"===v.slice(-1)||x)&&ke(o),_&&(g=":",p=U);var j,O,M,S=(l||n)&&[[]],P="",F="",R="",I="",D="",V="",B="",L="",J=!(b=b||n&&!i)&&!g;c=c||(v=v||"#data",g),a(C),m=C+o.length,h?f&&y.push(["*","\n"+v.replace(/^:/,"ret+= ").replace(A,"$1")+";\n"]):c?("else"===c&&(N.test(v)&&ke('For "{{else if expr}}" use "{{else expr}}"'),S=k[9]&&[[]],k[10]=e.substring(k[10],C),O=k[11]||k[0]||ke("Mismatched: "+o),k=w.pop(),y=k[2],J=!0),v&&Te(v.replace(T," "),S,t,n).replace(E,(function(e,t,n,r,o,i,a,s){return"this:"===r&&(i="undefined"),s&&(M=M||"@"===s[0]),r="'"+o+"':",a?(F+=n+i+",",I+="'"+s+"',"):n?(R+=r+"j._cp("+i+',"'+s+'",view),',V+=r+"'"+s+"',"):t?B+=i:("trigger"===o&&(L+=i),"lateRender"===o&&(j="false"!==s),P+=r+i+",",D+=r+"'"+s+"',",u=u||q.test(o)),""})).slice(0,-1),S&&S[0]&&S.pop(),d=[c,p||!!r||u||"",J&&[],je(I||(":"===c?"'#data',":""),D,V),je(F||(":"===c?"data,":""),P,R),B,L,j,M,S||0],y.push(d),J&&(w.push(k),(k=d)[10]=m,k[11]=O)):$&&(s($!==k[0]&&$!==k[11]&&$,k[0]),k[10]=e.substring(k[10],C),k=w.pop()),s(!k&&$),y=k[2]})),a(e.length),(m=g[g.length-1])&&s(""+m!==m&&+m[10]===m[10]&&m[0]),n){for(c=Ae(g,e,n),p=[],l=g.length;l--;)p.unshift(g[l][9]);Ce(c,p)}else c=Ae(g,t);return c}function Ce(e,t){var n,r,o=0,i=t.length;for(e.deps=[],e.paths=[];o<i;o++)for(n in e.paths.push(r=t[o]),r)"_jsvto"!==n&&r.hasOwnProperty(n)&&r[n].length&&!r[n].skp&&(e.deps=e.deps.concat(r[n]))}function je(e,t,n){return[e.slice(0,-1),t.slice(0,-1),n.slice(0,-1)]}function Te(e,n,r,o){var i,a,s,l,c,d=n&&n[0],u={bd:d},p={0:u},f=0,_=0,h=0,v={},w=0,b={},x={},y={},k={0:0},$={0:""},C=0;return"@"===e[0]&&(e=e.replace(D,".")),s=(e+(r?" ":"")).replace(g.rPrm,(function(r,s,j,T,A,E,N,M,S,q,P,F,R,I,D,V,B,L,U,J,K){T&&!M&&(A=T+A),E=E||"",R=R||"",j=j||s||R,A=A||S,q&&(q=!/\)|]/.test(K[J-1]))&&(A=A.slice(1).split(".").join("^")),P=P||L||"";var Y,H,z,W,X,Z,G,ee=J;if(!c&&!l){if(N&&ke(e),B&&d){if(Y=y[h-1],K.length-1>ee-(Y||0)){if(Y=t.trim(K.slice(Y,ee+r.length)),H=a||p[h-1].bd,(z=H[H.length-1])&&z.prm){for(;z.sb&&z.sb.prm;)z=z.sb;W=z.sb={path:z.sb,bnd:z.bnd}}else H.push(W={path:H.pop()});z&&z.sb===W&&($[h]=$[h-1].slice(z._cpPthSt)+$[h],$[h-1]=$[h-1].slice(0,z._cpPthSt)),W._cpPthSt=k[h-1],W._cpKey=Y,$[h]+=K.slice(C,J),C=J,W._cpfn=Q[Y]=Q[Y]||new Function("data,view,j","//"+Y+"\nvar v;\nreturn ((v="+$[h]+("]"===V?")]":V)+")!=null?v:null);"),$[h-1]+=x[_]&&m.cache?'view.getCache("'+Y.replace(O,"\\$&")+'"':$[h],W.prm=u.bd,W.bnd=W.bnd||W.path&&W.path.indexOf("^")>=0}$[h]=""}"["===P&&(P="[j._sq("),"["===j&&(j="[j._sq(")}return G=c?(c=!I)?r:R+'"':l?(l=!D)?r:R+'"':(j?(b[++_]=!0,v[_]=0,d&&(y[h++]=ee++,u=p[h]={bd:[]},$[h]="",k[h]=1),j):"")+(U?_?"":(f=K.slice(f,ee),(i?(i=a=!1,"\b"):"\b,")+f+(f=ee+r.length,d&&n.push(u.bd=[]),"\b")):M?(h&&ke(e),d&&n.pop(),i="_"+A,T,f=ee+r.length,d&&((d=u.bd=n[i]=[]).skp=!T),A+":"):A?A.split("^").join(".").replace(g.rPath,(function(e,t,r,s,l,c,p,f){if(X="."===r,r&&(A=A.slice(t.length),/^\.?constructor$/.test(f||A)&&ke(e),X||(e=(q?(o?"":"(ltOb.lt=ltOb.lt||")+"(ob=":"")+(s?'view.ctxPrm("'+s+'")':l?"view":"data")+(q?")===undefined"+(o?"":")")+'?"":view._getOb(ob,"':"")+(f?(c?"."+c:s||l?"":"."+r)+(p||""):(f=s?"":l?c||"":r,"")),e=t+("view.data"===(e+=f?"."+f:"").slice(0,9)?e.slice(5):e)+(q?(o?'"':'",ltOb')+(P?",1)":")"):"")),d)){if(H="_linkTo"===i?a=n._jsvto=n._jsvto||[]:u.bd,z=X&&H[H.length-1]){if(z._cpfn){for(;z.sb;)z=z.sb;z.prm&&(z.bnd&&(A="^"+A.slice(1)),z.sb=A,z.bnd=z.bnd||"^"===A[0])}}else H.push(A);P&&!X&&(y[h]=ee,k[h]=$[h].length)}return e}))+(P||E):E||(V?"]"===V?")]":")":F?(x[_]||ke(e),","):s?"":(c=I,l=D,'"'))),c||l||V&&(x[_]=!1,_--),d&&(c||l||(V&&(b[_+1]&&(u=p[--h],b[_+1]=!1),w=v[_+1]),P&&(v[_+1]=$[h].length+(j?1:0),(A||V)&&(u=p[++h]={bd:[]},b[_+1]=!0))),$[h]=($[h]||"")+K.slice(C,J),C=J+r.length,c||l||((Z=j&&b[_+1])&&($[h-1]+=j,k[h-1]++),"("===P&&X&&!W&&($[h]=$[h-1].slice(w)+$[h],$[h-1]=$[h-1].slice(0,w))),$[h]+=Z?G.slice(1):G),c||l||!P||(_++,A&&"("===P&&(x[_]=!0)),c||l||!L||(d&&($[h]+=P),G+=P),G})),d&&(s=$[0]),!_&&s||ke(e)}function Ae(e,t,n){var r,o,i,a,s,l,c,d,u,p,g,h,v,w,b,x,y,k,$,C,j,O,E,N,M,S,q,P,F,R,I,D,V,B,L=0,J=m.useViews||t.useViews||t.tags||t.templates||t.helpers||t.converters,K="",Y={},H=e.length;for(""+t===t?(y=n?'data-link="'+t.replace(T," ").slice(1,-1)+'"':t,t=0):(y=t.tmplName||"unnamed",t.allowCode&&(Y.allowCode=!0),t.debug&&(Y.debug=!0),p=t.bnds,x=t.tmpls),r=0;r<H;r++)if(""+(o=e[r])===o)K+='+"'+o+'"';else if("*"===(i=o[0]))K+=";\n"+o[1]+"\nret=ret";else{if(a=o[1],C=!n&&o[2],V=o[3],B=h=o[4],s="\n\tparams:{args:["+V[0]+"],\n\tprops:{"+V[1]+"}"+(V[2]?",\n\tctx:{"+V[2]+"}":"")+"},\n\targs:["+B[0]+"],\n\tprops:{"+B[1]+"}"+(B[2]?",\n\tctx:{"+B[2]+"}":""),F=o[6],R=o[7],o[8]?(I="\nvar ob,ltOb={},ctxs=",D=";\nctxs.lt=ltOb.lt;\nreturn ctxs;"):(I="\nreturn ",D=""),j=o[10]&&o[10].replace(A,"$1"),(N="else"===i)?g&&g.push(o[9]):(q=o[5]||!1!==_.debugMode&&"undefined",p&&(g=o[9])&&(g=[g],L=p.push(1))),J=J||h[1]||h[2]||g||/view.(?!index)/.test(h[0]),(M=":"===i)?a&&(i=a===U?">":a+i):(C&&((k=me(j,Y)).tmplName=y+"/"+i,k.useViews=k.useViews||J,Ae(C,k),J=k.useViews,x.push(k)),N||($=i,J=J||i&&(!f[i]||!f[i].flow),E=K,K=""),O=(O=e[r+1])&&"else"===O[0]),P=q?";\ntry{\nret+=":"\n+",v="",w="",M&&(g||F||a&&a!==U||R)){if((S=new Function("data,view,j","// "+y+" "+ ++L+" "+i+I+"{"+s+"};"+D))._er=q,S._tag=i,S._bd=!!g,S._lr=R,n)return S;Ce(S,g),u=!0,v=(b='c("'+a+'",view,')+L+",",w=")"}if(K+=M?(n?(q?"try{\n":"")+"return ":P)+(u?(u=void 0,J=d=!0,b+(S?(p[L-1]=S,L):"{"+s+"}")+")"):">"===i?(c=!0,"h("+h[0]+")"):(!0,"((v="+h[0]+")!=null?v:"+(n?"null)":'"")'))):(l=!0,"\n{view:view,content:false,tmpl:"+(C?x.length:"false")+","+s+"},"),$&&!O){if(K="["+K.slice(0,-1)+"]",b='t("'+$+'",view,this,',n||g){if((K=new Function("data,view,j"," // "+y+" "+L+" "+$+I+K+D))._er=q,K._tag=$,g&&Ce(p[L-1]=K,g),K._lr=R,n)return K;v=b+L+",undefined,",w=")"}K=E+P+b+(g&&L||K)+")",g=0,$=0}q&&!O&&(J=!0,K+=";\n}catch(e){ret"+(n?"urn ":"+=")+v+"j._err(e,view,"+q+")"+w+";}"+(n?"":"\nret=ret"))}K="// "+y+(Y.debug?"\ndebugger;":"")+"\nvar v"+(l?",t=j._tag":"")+(d?",c=j._cnvt":"")+(c?",h=j._html":"")+(n?(o[8]?", ob":"")+";\n":',ret=""')+K+(n?"\n":";\nreturn ret;");try{K=new Function("data,view,j",K)}catch(e){ke("Compiled template code:\n\n"+K+'\n: "'+(e.message||e)+'"')}return t&&(t.fn=K,t.useViews=!!J),K}function Oe(e,t){return e&&e!==t?t?ie(ie({},t),e):e:t&&ie({},t)}function Ee(e,n){var r,o,i,a=n.tag,s=n.props,d=n.params.props,u=s.filter,p=s.sort,f=!0===p,g=parseInt(s.step),_=s.reverse?-1:1;if(!c(e))return e;if(f||p&&""+p===p?((r=e.map((function(e,t){return{i:t,v:""+(e=f?e:le(e,p))===e?e.toLowerCase():e}}))).sort((function(e,t){return e.v>t.v?_:e.v<t.v?-_:0})),e=r.map((function(t){return e[t.i]}))):(p||_<0)&&!a.dataMap&&(e=e.slice()),l(p)&&(e=e.sort((function(){return p.apply(n,arguments)}))),_<0&&(!p||l(p))&&(e=e.reverse()),e.filter&&u&&(e=e.filter(u,n),n.tag.onFilter&&n.tag.onFilter(n)),d.sorted&&(r=p||_<0?e:e.slice(),a.sorted?t.observable(a.sorted).refresh(r):n.map.sorted=r),o=s.start,i=s.end,(d.start&&void 0===o||d.end&&void 0===i)&&(o=i=0),isNaN(o)&&isNaN(i)||(o=+o||0,i=void 0===i||i>e.length?e.length:+i,e=e.slice(o,i)),g>1){for(o=0,i=e.length,r=[];o<i;o+=g)r.push(e[o]);e=r}return d.paged&&a.paged&&$observable(a.paged).refresh(e),e}function Ne(e,n,r){var o=this.jquery&&(this[0]||ye("Unknown template")),i=o.getAttribute(K);return be.call(i&&t.data(o).jsvTmpl||d(o),e,n,r)}function Me(e){return B[e]||(B[e]="&#"+e.charCodeAt(0)+";")}function Se(e,t){return L[t]||""}function qe(e){return null!=e?S.test(e)&&(""+e).replace(F,Me)||e:""}if(a={jsviews:C,sub:{rPath:/^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,rPrm:/(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(?:(\()\s*)?\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,View:fe,Err:oe,tmplFn:$e,parse:Te,extend:ie,extendCtx:Oe,syntaxErr:ke,onStore:{template:function(e,t){null===t?delete z[e]:e&&(z[e]=t)}},addSetting:ve,settings:{allowCode:!1},advSet:re,_thp:te,_gm:ee,_tg:function(){},_cnvt:function(e,t,n,r){var o,i,a,s,l,c="number"==typeof n&&t.tmpl.bnds[n-1];void 0===r&&c&&c._lr&&(r="");void 0!==r?n=r={props:{},args:[r]}:c&&(n=c(t.data,t,g));if(c=c._bd&&c,e||c){if(i=t._lc,o=i&&i.tag,n.view=t,!o){if(o=ie(new g._tg,{_:{bnd:c,unlinked:!0,lt:n.lt},inline:!i,tagName:":",convert:e,onArrayChange:!0,flow:!0,tagCtx:n,tagCtxs:[n],_is:"tag"}),(s=n.args.length)>1)for(l=o.bindTo=[];s--;)l.unshift(s);i&&(i.tag=o,o.linkCtx=i),n.ctx=Oe(n.ctx,(i?i.view:t).ctx),te(o,n)}o._er=r&&a,o.ctx=n.ctx||o.ctx||{},n.ctx=void 0,a=o.cvtArgs()[0],o._er=r&&a}else a=n.args[0];return null!=(a=c&&t._.onRender?t._.onRender(a,t,o):a)?a:""},_tag:function(e,t,n,r,o,a){function s(e){var t=l[e];if(void 0!==t)for(t=c(t)?t:[t],h=t.length;h--;)F=t[h],isNaN(parseInt(F))||(t[h]=parseInt(F));return t||[0]}var l,d,p,f,_,m,h,v,w,b,x,y,k,$,C,j,T,A,O,E,N,M,S,q,F,R,I,D,V,B=0,L="",J=(t=t||i)._lc||!1,K=t.ctx,Y=n||t.tmpl,H="number"==typeof r&&t.tmpl.bnds[r-1];"tag"===e._is?(e=(l=e).tagName,r=l.tagCtxs,l.template):(d=t.getRsc("tags",e)||ye("Unknown tag: {{"+e+"}} "),d.template);void 0===a&&H&&(H._lr=d.lateRender&&!1!==H._lr||H._lr)&&(a="");void 0!==a?(L+=a,r=a=[{props:{},args:[],params:{props:{}}}]):H&&(r=H(t.data,t,g));for(m=r.length;B<m;B++)b=r[B],j=b.tmpl,(!J||!J.tag||B&&!J.tag.inline||l._er||j&&+j===j)&&(j&&Y.tmpls&&(b.tmpl=b.content=Y.tmpls[j-1]),b.index=B,b.ctxPrm=ce,b.render=be,b.cvtArgs=de,b.bndArgs=pe,b.view=t,b.ctx=Oe(Oe(b.ctx,d&&d.ctx),K)),(n=b.props.tmpl)&&(b.tmpl=t._getTmpl(n),b.content=b.content||b.tmpl),l?J&&J.fn._lr&&(T=!!l.init):(l=new d._ctr,T=!!l.init,l.parent=_=K&&K.tag,l.tagCtxs=r,J&&(l.inline=!1,J.tag=l),l.linkCtx=J,(l._.bnd=H||J.fn)?(l._.ths=b.params.props.this,l._.lt=r.lt,l._.arrVws={}):l.dataBoundOnly&&ye(e+" must be data-bound:\n{^{"+e+"}}")),S=l.dataMap,b.tag=l,S&&r&&(b.map=r[B].map),l.flow||(x=b.ctx=b.ctx||{},p=l.parents=x.parentTags=K&&Oe(x.parentTags,K.parentTags)||{},_&&(p[_.tagName]=_),p[l.tagName]=x.tag=l,x.tagCtx=b);if(!(l._er=a)){for(te(l,r[0]),l.rendering={rndr:l.rendering},B=0;B<m;B++){if(b=l.tagCtx=r[B],M=b.props,l.ctx=b.ctx,!B){if(T&&(l.init(b,J,l.ctx),T=void 0),b.args.length||!1===b.argDefault||!1===l.argDefault||(b.args=E=[b.view.data],b.params.args=["#data"]),k=s("bindTo"),void 0!==l.bindTo&&(l.bindTo=k),void 0!==l.bindFrom?l.bindFrom=s("bindFrom"):l.bindTo&&(l.bindFrom=l.bindTo=k),$=l.bindFrom||k,I=k.length,R=$.length,l._.bnd&&(D=l.linkedElement)&&(l.linkedElement=D=c(D)?D:[D],I!==D.length&&ye("linkedElement not same length as bindTo")),(D=l.linkedCtxParam)&&(l.linkedCtxParam=D=c(D)?D:[D],R!==D.length&&ye("linkedCtxParam not same length as bindFrom/bindTo")),$)for(l._.fromIndex={},l._.toIndex={},v=R;v--;)for(F=$[v],h=I;h--;)F===k[h]&&(l._.fromIndex[h]=v,l._.toIndex[v]=h);J&&(J.attr=l.attr=J.attr||l.attr||J._dfAt),f=l.attr,l._.noVws=f&&f!==U}if(E=l.cvtArgs(B),l.linkedCtxParam)for(N=l.cvtArgs(B,1),h=R,V=l.constructor.prototype.ctx;h--;)(y=l.linkedCtxParam[h])&&(F=$[h],C=N[h],b.ctx[y]=g._cp(V&&void 0===C?V[y]:C,void 0!==C&&ue(b.params,F),b.view,l._.bnd&&{tag:l,cvt:l.convert,ind:h,tagElse:B}));(A=M.dataMap||S)&&(E.length||M.dataMap)&&((O=b.map)&&O.src===E[0]&&!o||(O&&O.src&&O.unmap(),A.map(E[0],b,O,!l._.bnd),O=b.map),E=[O.tgt]),w=void 0,l.render&&(w=l.render.apply(l,E),t.linked&&w&&!P.test(w)&&((n={links:[]}).render=n.fn=function(){return w},w=xe(n,t.data,void 0,!0,t,void 0,void 0,l))),E.length||(E=[t]),void 0===w&&(q=E[0],l.contentCtx&&(q=!0===l.contentCtx?t:l.contentCtx(q)),w=b.render(q,!0)||(o?void 0:"")),L=L?L+(w||""):void 0!==w?""+w:void 0}l.rendering=l.rendering.rndr}l.tagCtx=r[0],l.ctx=l.tagCtx.ctx,l._.noVws&&l.inline&&(L="text"===f?u.html(L):"");return H&&t._.onRender?t._.onRender(L,t,l):L},_er:ye,_err:function(e,t,n){var r=void 0!==n?l(n)?n.call(t.data,e,t):n||"":"{Error: "+(e.message||e)+"}";_.onError&&void 0!==(n=_.onError.call(t.data,e,n&&r,t))&&(r=n);return t&&!t._lc?u.html(r):r},_cp:ne,_sq:function(e){return"constructor"===e&&ke(""),e}},settings:{delimiters:function e(t,n,r){if(!t)return _.delimiters;if(c(t))return e.apply(a,t);y=r?r[0]:y,/^(\W|_){5}$/.test(t+n+y)||ye("Invalid delimiters");return v=t[0],w=t[1],b=n[0],x=n[1],_.delimiters=[v+w,b+x,y],t="\\"+v+"(\\"+y+")?\\"+w,n="\\"+b+"\\"+x,o="(?:(\\w+(?=[\\/\\s\\"+b+"]))|(\\w+)?(:)|(>)|(\\*))\\s*((?:[^\\"+b+"]|\\"+b+"(?!\\"+x+"))*?)",g.rTag="(?:"+o+")",o=new RegExp("(?:"+t+o+"(\\/)?|\\"+v+"(\\"+y+")?\\"+w+"(?:(?:\\/(\\w+))\\s*|!--[\\s\\S]*?--))"+n,"g"),g.rTmpl=new RegExp("^\\s|\\s$|<.*>|([^\\\\]|^)[{}]|"+t+".*"+n),h},advanced:function(e){return e?(ie(m,e),g.advSet(),h):m}},map:we},(oe.prototype=new Error).constructor=oe,ae.depends=function(){return[this.get("item"),"index"]},se.depends="index",fe.prototype={get:function(e,t){t||!0===e||(t=e,e=void 0);var n,r,o,i,a=this,s="root"===t;if(e){if(!(i=t&&a.type===t&&a))if(n=a.views,a._.useKey){for(r in n)if(i=t?n[r].get(e,t):n[r])break}else for(r=0,o=n.length;!i&&r<o;r++)i=t?n[r].get(e,t):n[r]}else if(s)i=a.root;else if(t)for(;a&&!i;)i=a.type===t?a:void 0,a=a.parent;else i=a.parent;return i||void 0},getIndex:se,ctxPrm:ce,getRsc:function(e,t){var n,r,o=this;if(""+t===t){for(;void 0===n&&o;)n=(r=o.tmpl&&o.tmpl[e])&&r[t],o=o.parent;return n||a[e][t]}},_getTmpl:function(e){return e&&(e.fn?e:this.getRsc("templates",e)||d(e))},_getOb:le,getCache:function(e){return _._cchCt>this.cache._ct&&(this.cache={_ct:_._cchCt}),void 0!==this.cache[e]?this.cache[e]:this.cache[e]=Q[e](this.data,this,g)},_is:"view"},g=a.sub,h=a.settings,!(W||t&&t.render)){for(r in Z)he(r,Z[r]);if(u=a.converters,p=a.helpers,f=a.tags,g._tg.prototype={baseApply:function(e){return this.base.apply(this,e)},cvtArgs:de,bndArgs:pe,ctxPrm:ce},i=g.topView=new fe,t){if(t.fn.render=Ne,s=t.expando,t.observable){if(C!==(C=t.views.jsviews))throw"jquery.observable.js requires jsrender.js "+C;ie(g,t.views.sub),a.map=t.views.map}}else t={},n&&(e.jsrender=t),t.renderFile=t.__express=t.compile=function(){throw"Node.js: use npm jsrender, or jsrender-node.js"},t.isFunction=function(e){return"function"==typeof e},t.isArray=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},g._jq=function(e){e!==t&&(ie(e,t),(t=e).fn.render=Ne,delete t.jsrender,s=t.expando)},t.jsrender=C;for(k in(_=g.settings).allowCode=!1,l=t.isFunction,t.render=z,t.views=a,t.templates=d=a.templates,_)ve(k);(h.debugMode=function(e){return void 0===e?_.debugMode:(_._clFns&&_._clFns(),_.debugMode=e,_.onError=e+""===e?function(){return e}:l(e)?e:void 0,h)})(!1),m=_.advanced={cache:!0,useViews:!1,_jsv:!1},f({if:{render:function(e){var t=this,n=t.tagCtx;return t.rendering.done||!e&&(n.args.length||!n.index)?"":(t.rendering.done=!0,void(t.selected=n.index))},contentCtx:!0,flow:!0},for:{sortDataMap:we(Ee),init:function(e,t){this.setDataMap(this.tagCtxs)},render:function(e){var t,n,r,o,i,a=this,s=a.tagCtx,l=!1===s.argDefault,d=s.props,u=l||s.args.length,p="",f=0;if(!a.rendering.done){if(t=u?e:s.view.data,l)for(l=d.reverse?"unshift":"push",o=+d.end,i=+d.step||1,t=[],r=+d.start||0;(o-r)*i>0;r+=i)t[l](r);void 0!==t&&(n=c(t),p+=s.render(t,!u||d.noIteration),f+=n?t.length:1),(a.rendering.done=f)&&(a.selected=s.index)}return p},setDataMap:function(e){for(var t,n,r,o=e.length;o--;)n=(t=e[o]).props,r=t.params.props,t.argDefault=void 0===n.end||t.args.length>0,n.dataMap=!1!==t.argDefault&&c(t.args[0])&&(r.sort||r.start||r.end||r.step||r.filter||r.reverse||n.sort||n.start||n.end||n.step||n.filter||n.reverse)&&this.sortDataMap},flow:!0},props:{baseTag:"for",dataMap:we((function(e,n){var r,o,i=n.map,a=i&&i.propsArr;if(!a){if(a=[],typeof e===J||l(e))for(r in e)o=e[r],r===s||!e.hasOwnProperty(r)||n.props.noFunctions&&t.isFunction(o)||a.push({key:r,prop:o});i&&(i.propsArr=i.options&&a)}return Ee(a,n)})),init:re,flow:!0},include:{flow:!0},"*":{render:ne,flow:!0},":*":{render:ne,flow:!0},dbg:p.dbg=u.dbg=function(e){try{throw console.log("JsRender dbg breakpoint: "+e),"dbg breakpoint"}catch(e){}return this.base?this.baseApply(arguments):e}}),u({html:qe,attr:qe,encode:function(e){return""+e===e?e.replace(R,Me):e},unencode:function(e){return""+e===e?e.replace(I,Se):e},url:function(e){return null!=e?encodeURI(""+e):null===e?e:""}})}return _=g.settings,c=(t||W).isArray,h.delimiters("{{","}}","^"),X&&W.views.sub._jq(t),t||W}),window)},7030:()=>{},6471:()=>{},1201:()=>{},5815:()=>{}},__webpack_module_cache__={},deferred;function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=(e,t,n,r)=>{if(!t){var o=1/0;for(l=0;l<deferred.length;l++){for(var[t,n,r]=deferred[l],i=!0,a=0;a<t.length;a++)(!1&r||o>=r)&&Object.keys(__webpack_require__.O).every((e=>__webpack_require__.O[e](t[a])))?t.splice(a--,1):(i=!1,r<o&&(o=r));if(i){deferred.splice(l--,1);var s=n();void 0!==s&&(e=s)}}return e}r=r||0;for(var l=deferred.length;l>0&&deferred[l-1][2]>r;l--)deferred[l]=deferred[l-1];deferred[l]=[t,n,r]},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={8894:0,1336:0,4464:0,3961:0,8261:0};__webpack_require__.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[i,a,s]=n,l=0;for(r in a)__webpack_require__.o(a,r)&&(__webpack_require__.m[r]=a[r]);if(s)var c=s(__webpack_require__);for(t&&t(n);l<i.length;l++)o=i[l],__webpack_require__.o(e,o)&&e[o]&&e[o][0](),e[i[l]]=0;return __webpack_require__.O(c)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),__webpack_require__.O(void 0,[1336,4464,3961,8261],(()=>__webpack_require__(4532))),__webpack_require__.O(void 0,[1336,4464,3961,8261],(()=>__webpack_require__(7030))),__webpack_require__.O(void 0,[1336,4464,3961,8261],(()=>__webpack_require__(6471))),__webpack_require__.O(void 0,[1336,4464,3961,8261],(()=>__webpack_require__(1201)));var __webpack_exports__=__webpack_require__.O(void 0,[1336,4464,3961,8261],(()=>__webpack_require__(5815)));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();