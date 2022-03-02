(()=>{"use strict";({48:function(){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(e)}$(document).ready((function(){$("#expiryMonth, #expiryYear").select2()})),$(document).on("click","#submitBtn",(function(r){$(".demoInputBox").css("background-color","");var e="",n=$("#cardHolderName").val(),t=$("#cardNumber").val(),a=$("#expiryMonth").val(),i=$("#expiryYear").val(),o=$("#cvv").val();return""==n?(e+="Card holder name fields are required.",$(".error").html(e),$("#errorCard").addClass("show"),!1):""==n||/^[a-z ,.'-]+$/i.test(n)?""==t?(e="Card number fields are required.",$(".error").html(e),$("#errorCard").addClass("show"),!1):""===a?(e="Expiration month fields are required.",$(".error").html(e),$("#errorCard").addClass("show"),!1):""===i?(e+="Expiration year fields are required.",$(".error").html(e),$("#errorCard").addClass("show"),!1):(a=parseInt(a)+1,new Date(i+"-"+a+"-01")<new Date?(e+="Enter valid expiration date.",$(".error").html(e),$("#errorCard").addClass("show"),!1):""==o?(e+="CVV number fields are required.",$(".error").html(e),$("#errorCard").addClass("show"),!1):""==o||/^[0-9]{3,3}$/.test(o)?(""!=t&&$("#cardNumber").validateCreditCard((function(r){if(!r.valid)return e="Card number is invalid.",$(".error").html(e),$("#errorCard").addClass("show"),!1})),""==e&&void 0):(e+="CVV is invalid.",$(".error").html(e),$("#errorCard").addClass("show"),!1)):(e="Card holder name is Invalid.",$(".error").html(e),$("#errorCard").addClass("show"),!1)})),function(){var e,n,t,a=[].indexOf||function(r){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===r)return e;return-1};t=function(){function r(){this.trie={}}return r.prototype.push=function(r){var e,n,t,a,i,o,l;for(r=r.toString(),i=this.trie,l=[],n=t=0,a=(o=r.split("")).length;t<a;n=++t)null==i[e=o[n]]&&(n===r.length-1?i[e]=null:i[e]={}),l.push(i=i[e]);return l},r.prototype.find=function(r){var e,n,t,a,i,o;for(r=r.toString(),i=this.trie,n=t=0,a=(o=r.split("")).length;t<a;n=++t){if(e=o[n],!i.hasOwnProperty(e))return!1;if(null===i[e])return!0;i=i[e]}},r}(),n=function(){function r(r){if(this.trie=r,this.trie.constructor!==t)throw Error("Range constructor requires a Trie parameter")}return r.rangeWithString=function(e){var n,a,i,o,l,u,d,s,c;if("string"!=typeof e)throw Error("rangeWithString requires a string parameter");for(e=(e=e.replace(/ /g,"")).split(","),c=new t,n=0,i=e.length;n<i;n++)if(l=(u=e[n]).match(/^(\d+)-(\d+)$/))for(o=a=d=l[1],s=l[2];d<=s?a<=s:a>=s;o=d<=s?++a:--a)c.push(o);else{if(!u.match(/^\d+$/))throw Error("Invalid range '"+l+"'");c.push(u)}return new r(c)},r.prototype.match=function(r){return this.trie.find(r)},r}(),(e=jQuery).fn.validateCreditCard=function(t,i){var o,l,u,d,s,c,h,f,v,g,m,p,$,y;for(d=[{name:"amex",range:"34,37",valid_length:[15]},{name:"diners_club_carte_blanche",range:"300-305",valid_length:[14]},{name:"diners_club_international",range:"36",valid_length:[14]},{name:"jcb",range:"3528-3589",valid_length:[16]},{name:"laser",range:"6304, 6706, 6709, 6771",valid_length:[16,17,18,19]},{name:"visa_electron",range:"4026, 417500, 4508, 4844, 4913, 4917",valid_length:[16]},{name:"visa",range:"4",valid_length:[13,14,15,16,17,18,19]},{name:"mastercard",range:"51-55,2221-2720",valid_length:[16]},{name:"discover",range:"6011, 622126-622925, 644-649, 65",valid_length:[16]},{name:"dankort",range:"5019",valid_length:[16]},{name:"maestro",range:"50, 56-69",valid_length:[12,13,14,15,16,17,18,19]},{name:"uatp",range:"1",valid_length:[15]}],o=!1,t&&("object"===r(t)?(i=t,o=!1,t=null):"function"==typeof t&&(o=!0)),null==i&&(i={}),null==i.accept&&(i.accept=function(){var r,e,n;for(n=[],r=0,e=d.length;r<e;r++)l=d[r],n.push(l.name);return n}()),f=0,v=(m=i.accept).length;f<v;f++)if(u=m[f],a.call(function(){var r,e,n;for(n=[],r=0,e=d.length;r<e;r++)l=d[r],n.push(l.name);return n}(),u)<0)throw Error("Credit card type '"+u+"' is not supported");return s=function(r){var e,t,o;for(o=function(){var r,e,n,t;for(t=[],r=0,e=d.length;r<e;r++)n=(l=d[r]).name,a.call(i.accept,n)>=0&&t.push(l);return t}(),e=0,t=o.length;e<t;e++)if(u=o[e],n.rangeWithString(u.range).match(r))return u;return null},h=function(r){var e,n,t,a,i,o;for(o=0,a=n=0,t=(i=r.split("").reverse()).length;n<t;a=++n)e=+(e=i[a]),o+=a%2?(e*=2)<10?e:e-9:e;return o%10==0},c=function(r,e){var n;return n=r.length,a.call(e.valid_length,n)>=0},$=function(r){var e,n;return n=!1,e=!1,null!=(u=s(r))&&(n=h(r),e=c(r,u)),{card_type:u,valid:n&&e,luhn_valid:n,length_valid:e}},y=this,p=function(){var r;return r=g(e(y).val()),$(r)},g=function(r){return r.replace(/[ -]/g,"")},o?(this.on("input.jccv",function(r){return function(){return e(r).off("keyup.jccv"),t.call(r,p())}}(this)),this.on("keyup.jccv",function(r){return function(){return t.call(r,p())}}(this)),t.call(this,p()),this):p()}}.call(this)}})[48]()})();