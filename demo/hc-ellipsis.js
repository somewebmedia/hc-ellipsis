/*
 * HC Ellipsis
 * ===================
 * Version: 0.0.1
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-ellipsis
 * Description: jQuery plugin for multi-line text overflow ellipsis
 * License: MIT
 */
"use strict";!function(a,r){var o=r.document,c=function(e){return e.find("*").addBack().contents().filter(function(){return 3===this.nodeType&&this.textContent.trim()}).eq(0)};a.fn.extend({ellipsis:function(){var s=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"...",l=s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").replace(" ","\\s");return this.each(function(){var e=a(this),t=a('<span class="ellipsis-text">').css({display:"block"}),i=null;if(!e.data("ellipsis")){e.data("ellipsis",!0),e.data("original-text",e.text());var n=function(){c(e).replaceWith(e.data("original-text")),e.ellipsis(s)};a(r).on("resize load",n),a(o).ready(n)}for(c(e).wrap(t),t=e.find("span.ellipsis-text"),e.is(":visible")||(i=e.closest(":visible").children().has(e).show());e.height()<t.height()&&!(t.text().length<=s.length);)t.text(function(e,t){return t.replace(new RegExp("s?[^s]*("+l+")?$"),s)});t.replaceWith(t.text()),i&&i.hide(),t.remove()})}})}(jQuery,"undefined"!=typeof window?window:this);