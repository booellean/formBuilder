import controlTextarea from './textarea';

// import the editor
import FroalaEditor from 'froala-editor';

// import js plugins
// import 'froala-editor/js/plugins/align.min.js';
// import 'froala-editor/js/plugins/char_counter.min.js';
// import 'froala-editor/js/plugins/code_beautifier.min.js';
// import 'froala-editor/js/plugins/code_view.min.js';
// import 'froala-editor/js/plugins/colors.min.js';
// import 'froala-editor/js/plugins/draggable.min.js';
// import 'froala-editor/js/plugins/edit_in_popup.min.js';
// import 'froala-editor/js/plugins/emoticons.min.js';
// import 'froala-editor/js/plugins/entities.min.js';
// import 'froala-editor/js/plugins/file.min.js';
// import 'froala-editor/js/plugins/font_family.min.js';
// import 'froala-editor/js/plugins/font_size.min.js';
// import 'froala-editor/js/plugins/forms.min.js';
// import 'froala-editor/js/plugins/fullscreen.min.js';
// import 'froala-editor/js/plugins/help.min.js';
// import 'froala-editor/js/plugins/image.min.js';
// import 'froala-editor/js/plugins/image_manager.min.js';
// import 'froala-editor/js/plugins/inline_class.min.js';
// import 'froala-editor/js/plugins/inline_style.min.js';
// import 'froala-editor/js/plugins/line_breaker.min.js';
// import 'froala-editor/js/plugins/line_height.min.js';
// import 'froala-editor/js/plugins/link.min.js';
// import 'froala-editor/js/plugins/lists.min.js';
// import 'froala-editor/js/plugins/paragraph_format.min.js';
// import 'froala-editor/js/plugins/paragraph_style.min.js';
// import 'froala-editor/js/plugins/print.min.js';
// import 'froala-editor/js/plugins/quick_insert.min.js';
// import 'froala-editor/js/plugins/quote.min.js';
// import 'froala-editor/js/plugins/save.min.js';
// import 'froala-editor/js/plugins/special_characters.min.js';
// import 'froala-editor/js/plugins/save.min.js';
// import 'froala-editor/js/plugins/table.min.js';
// import 'froala-editor/js/plugins/url.min.js';
// import 'froala-editor/js/plugins/video.min.js';
// import 'froala-editor/js/plugins/word_paste.min.js';

import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';

// import css

// import 'froala-editor/css/froala_editor.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins.pkgd.min.css';
import 'froala-editor/css/third_party/font_awesome.min.css';

/**
 * Froala editor element
 * See https://www.froala.com/wysiwyg-editor for more info
 *
 * To customise the options on this editor, simply pass any properties you wish to overwrite in the editorOptions below:
 * e.g. the below example would give users the following colors for their fonts
 * ```
    this.editorOptions = {
      height: 200,
      colors: ['#61BD6D', '#1ABC9C', '#54ACD2', 'REMOVE']
    }

    Here is a reference of all current buttons
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'color',
        'formatBlock',
        'blockStyle',
        'inlineStyle',
        'align',
        'insertOrderedList',
        'insertUnorderedList',
        'outdent',
        'indent',
        'selectAll',
        'createLink',
        'insertImage',
        'insertVideo',
        'table',
        'undo',
        'redo',
        'html',
        'save',
        'insertHorizontalRule',
        'uploadFile',
        'removeFormat',
        'fullscreen'
      ]
 * ```
 */
export default class controlFroala extends controlTextarea {
  /**
   * configure the froala editor requirements
   * * Includes all scripts and stylesheets needed for extra Froala button features. Disable as needed
   */
  configure() {
    // additional javascript config
    if (this.classConfig.js) {
      let js = this.classConfig.js
      if (!Array.isArray(js)) {
        js = new Array(js)
      }
      this.js.concat(js)
      delete this.classConfig.js
    }

  //   // additional css config
    if (this.classConfig.css) {
      this.css = this.classConfig.css
    }

  //   // configure the froala editor defaults
    this.editorOptions = {
      height: 200,
      iconTemplate: 'font_awesome_5',
      dragInline: false,
      pluginsEnabled: ['image', 'link', 'draggable'],
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'color',
        'formatBlock',
        'blockStyle',
        'inlineStyle',
        'align',
        'insertOrderedList',
        'insertUnorderedList',
        'outdent',
        'indent',
        'selectAll',
        'createLink',
        'insertImage',
        'insertVideo',
        'table',
        'undo',
        'redo',
        'html',
        'save',
        'insertHorizontalRule',
        'removeFormat',
        'fullscreen'
      ]
    }
  }

  /**
   * build a textarea DOM element, to be later replaced by the froala editor
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    this.disabled = false;
    const { value = '', ...attrs } = this.config
    this.field = this.markup('textarea', this.parsedHtml(value), attrs)
    // Make the editor read only if disabled is set on the textarea
    if (attrs.disabled) {
      this.editorOptions.readonly = true
    }
    return this.field
  }

  /**
   * When the element is rendered into the DOM, execute the following code to initialise it
   * @param {Object} evt - event
   */
  onRender(evt) {
    // define class options & allow them to be overwritten in the class config
    const classOptions = jQuery.extend(this.classConfig)
    classOptions.target = this.field
    
    // initialise the editor
    
    window.fbEditors.froala[this.id] = {};
    const editor = window.fbEditors.froala[this.id];
    editor.instance = new FroalaEditor(`textarea#${this.id}`);

    // extend options to the editor
    $.extend(editor.instance.opts, this.editorOptions);

    // Set userData
    // may be glitchy? This was altered from tinyMCE and froala may not support userData
    if (this.config.userData) {
      editor.instance.setContent(this.parsedHtml(this.config.userData[0]))
    }
  }
}

// register froala as a richtext control
controlTextarea.register('froala', controlFroala, 'textarea')
