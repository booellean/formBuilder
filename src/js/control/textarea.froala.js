import controlTextarea from './textarea';

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
    this.js = [
      // 'froala-editor/js/froala_editor.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/froala_editor.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/colors.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/char_counter.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/file.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/font_family.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/fullscreen.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/font_size.min.js',
      'https://use.fontawesome.com/releases/v5.0.8/js/all.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/third_party/font_awesome.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/lists.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/inline_style.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/paragraph_style.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/image.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/image_manager.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/table.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/url.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/js/plugins/video.min.js'
    ]
    this.css = [
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/froala_editor.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/colors.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/char_counter.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/file.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/fullscreen.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/third_party/font_awesome.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/image.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/image_manager.min.css,',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/table.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/3.0.6/css/plugins/video.min.css'
    ];
    // TODO: UPDATE Names and Documentation
    // ODO: Update controls in other files

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
