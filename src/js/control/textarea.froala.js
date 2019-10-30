import controlTextarea from './textarea';

// import the editor
import FroalaEditor from 'froala-editor';

// import js plugins
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/font_awesome.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';

// import css
// import 'froala-editor/css/froala_editor.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins.pkgd.min.css';
// import 'froala-editor/css/third_party/font_awesome.min.css';

// TODO: font-awesome doesnt' work.... REALLY broken. Disabled for now

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
 * ```
 */
export default class controlFroala extends controlTextarea {
  /**
   * configure the froala editor requirements
   * * Includes all scripts and stylesheets needed for extra Froala button features. Disable as needed
   */
  configure() {

    // this.css =['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css']

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
      height: 300,
      width: 1000,
      // Note: removing plugins automatically removes buttons. It's nice!
      pluginsEnabled:
      [
        'align',
        'charCounter',
        'codeBeautifier',
        'codeView',
        'colors',
        'draggable',
        'embedly',
        'emoticons',
        'entities',
        // 'file',
        'fontAwesome',
        'fontFamily',
        // 'fontSize',
        'fullscreen',
        'image',
        'imageTUI',
        // 'imageManager',
        'inlineStyle',
        'inlineClass',
        'lineBreaker',
        'lineHeight',
        'link',
        'lists',
        'paragraphFormat',
        'paragraphStyle',
        'print',
        'quickInsert',
        'quote',
        'save',
        'table',
        'url',
        'video',
        'wordPaste'
      ],
      // dragInline: false,
      // pluginsEnabled: ['image', 'link', 'draggable'],
      // TODO: delete upload options or change to true for stretch goal
      imageUpload: false,
      videoUpload: false,
      fileUpload: false
      // probably will never use this. I like all the features, and disabling plugins works for my purposes
    //   toolbarButtons:  [
    //     ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'], 
    //     ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], 
    //     ['inlineClass', 'inlineStyle', 'clearFormatting']]
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
    // extend options to the editor
    
    window.fbEditors.froala[this.id] = {};
    const editor = window.fbEditors.froala[this.id];
    editor.instance = FroalaEditor(`textarea#${this.id}`, this.editorOptions);

    // $.extend(editor.instance.opts, this.editorOptions);

    // Set userData
    // may be glitchy? This was altered from tinyMCE and froala may not support userData
    // if (this.config.userData) {
    //   editor.instance.setContent(this.parsedHtml(this.config.userData[0]))
    // }
  }
}

// register froala as a richtext control
controlTextarea.register('froala', controlFroala, 'textarea')
