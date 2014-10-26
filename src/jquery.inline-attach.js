/*jslint newcap: true */
/*global inlineAttach: false, jQuery: false */
/**
 * jQuery plugin for inline attach
 *
 * @param {document} document
 * @param {window} window
 * @param {jQuery} $
 */
(function(document, window, $) {
    "use strict";

    function jQueryEditor(instance) {

        var $this = $(instance);

        return {
            getValue: function() {
                return $this.val();
            },
            setValue: function(val) {
                $this.val(val);
            },
            getSelectionStart: function() {
                return $this.get(0).selectionStart;
            },
            getSelectionEnd: function() {
                return $this.get(0).selectionEnd;
            },
            supportsSelection: function() {
                return $this.get(0).selectionStart || $this.get(0).selectionStart === '0';
            }
        };
    }

    jQueryEditor.prototype = new inlineAttach.Editor();

    $.fn.inlineattach = function(options) {

        var set = $(this);

        set.each(function() {

            var $this           = $(this),
                editor          = new jQueryEditor($this),
                inlineattach    = new inlineAttach(options, editor);

            $this.bind({
                'paste': function(e) {
                    inlineattach.onPaste(e.originalEvent);
                },
                'drop': function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    inlineattach.onDrop(e.originalEvent);
                },
                'dragenter dragover': function(e) {
                    e.stopPropagation();
                }
            });
        });

        return this;
    };
})(document, window, jQuery);
