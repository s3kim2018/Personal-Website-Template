var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [ 'link', 'image', 'video', 'formula' ],          // add's image support
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
  title = document.getElementById('title')
  desc = document.getElementById('desc')
  date = document.getElementById('date')
  contents = document.getElementById('contents')
  if (document.getElementById('myFile').files.length == 0 || title.value == '' || date.value == '' || desc.value == '' || editor.getContents() == '') {
    document.getElementById('notification').innerHTML = "Please Fill Out All The Fields!"
    document.getElementById('notification').style.color = "red";
    return 
  }
  console.log(JSON.stringify(editor.getContents()))
  contents.value = JSON.stringify(editor.getContents())
  console.log(contents.value)
  urllst = window.location.href.split("/")
  formdata = new FormData(document.getElementById('theform'))
  formdata.set('title', title.value)
  formdata.set('date', date.value)
  formdata.set('desc', desc.value)
  formdata.set('data', contents.value)
  fetch('/savepost/' + urllst[urllst.length - 1], {
    method: 'post',
    body: formdata
  }).then(function(response) {
    return response.text()
  }).then(function(data) {
    console.log(data)
    if (data == "success") {
      document.getElementById('notification').innerHTML = "Success!"
      document.getElementById('notification').style.color = "green";
    } else if (data == "alreadythere") {
      document.getElementById('notification').innerHTML = "That Post Already Exists!"
      document.getElementById('notification').style.color = "red";
    } else {
      document.getElementById('notification').innerHTML = "Server Error!"
      document.getElementById('notification').style.color = "red";
    }
  })
})