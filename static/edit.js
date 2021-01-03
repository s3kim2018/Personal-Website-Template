var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['formula'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'] 

]
var options = {
  modules: {
      formula: true,
      toolbar: toolbarOptions
    },
    theme: 'snow'
  };
var editor = new Quill('#editor', options);  // First matching element will be used
var enableMathQuillFormulaAuthoring = mathquill4quill();

let post = document.getElementById('postbut')
post.addEventListener('click', function() {
  file = document.getElementById('myFile').files[0]
  name = document.getElementById('title')
  date = document.getElementById('date')
  console.log(name.innerHTML)
  console.log(date.innerHTML)
  console.log(editor.getContents())

  var formdata = new FormData() 
  if (document.getElementById('myFile').files.length == 0 || name.innerHTML == '' || date.innerHTML == '' || editor.getContents() == '') {
    console.log("Need more information")
    return 
  }
  formdata.set('postpic', file, file.name)
  formdata.set('name', name.innerHTML)
  formdata.set('date', date.innerHTML)
  formdata.set('content', editor.getContents())
  console.log(formdata)
})