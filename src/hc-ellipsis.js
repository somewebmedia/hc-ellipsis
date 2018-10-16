/*
 * HC Ellipsis
 * ===================
 * Version:
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-ellipsis
 * Description: jQuery plugin for multi-line text overflow ellipsis
 * License: MIT
 */

'use strict';

(function($, window) {
  const document = window.document;

  const textNode = ($el) => {
    return $el.find('*').addBack().contents().filter(function() {
      return this.nodeType === 3;
    });
  };

  $.fn.extend({
    ellipsis: function(delimiter = '...') {
      const delimiter_safe = delimiter.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(' ','\\s');

      return this.each(function(){
        const $container = $(this);
        let $span = $('<span class="ellipsis-text">').css({display:'block'});
        let $hidden = null;

        // do this only once
        if (!$container.data('ellipsis')) {
          $container.data('ellipsis', true);

          // save original text
          $container.data('original-text', $container.text());

          const reinit = () => {
            // return original text
            textNode($container).replaceWith($container.data('original-text'));
            // run ellipsis
            $container.ellipsis(delimiter);
          };

          // reinit on resize and page load
          $(window).on('resize load', reinit);
          $(document).ready(reinit);
        }

        // wrap text node into span
        textNode($container).wrap($span);

        // re-select span for some reason
        $span = $container.find('span.ellipsis-text');

        if (!$container.is(':visible')) {
          // element needs to be visible
          $hidden = $container.closest(':visible').children().has($container).show();
        }

        while ($container.height() < $span.height()) {
          // failsafe
          if ($span.text().length <= delimiter.length) {
            break;
          }

          // replace text
          $span.text(function(index, text) {
            return text.replace(new RegExp('\s?[^\s]*(' + delimiter_safe + ')?$'), delimiter);
          });
        }

        $span.replaceWith($span.text());

        if ($hidden) {
          $hidden.hide();
        }

        // clear span
        $span.remove();
      });
    }
  });
})(jQuery, typeof window !== 'undefined' ? window : this);