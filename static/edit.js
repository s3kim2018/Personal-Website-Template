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
var Delta = Quill.import('delta');
var options = {
  modules: {
      formula: true,
      toolbar: toolbarOptions
    },
    theme: 'snow'
  };
var editor = new Quill('#editor', options);  // First matching element will be used
var enableMathQuillFormulaAuthoring = mathquill4quill();

var change = new Delta();
editor.on('text-change', function(delta) {
  change = change.compose(delta);
});

// Save periodically
setInterval(function() {
  if (change.length() > 0) {
    document.getElementById('savenotif').innerHTML = '<div style = "margin-top: 5px; margin-right: 5px" class="ui small active inline loader"></div><p style = "line-height: 36px;">&#32;Saving Post...</p>'
    console.log('Saving changes', change);
    save()
    change = new Delta();
  }
}, 5*1000);

save = function() {
  file = document.getElementById('myFile').files[0]
  title = document.getElementById('title')
  desc = document.getElementById('desc')
  date = document.getElementById('date')
  contents = document.getElementById('contents')
  formdata = new FormData(document.getElementById('theform'))
  contents.value = JSON.stringify(editor.getContents())
  if (title.value == '') {
    document.getElementById('savenotif').innerHTML = '<p style = "line-height: 36px; color: red;">You need a title to save.</p>'
    return
  }
  if (editor.getContents() == '') {
    document.getElementById('savenotif').innerHTML = '<p style = "line-height: 36px; color: red;">No content can be found.</p>'
    return
  }
  formdata.set('title', title.value)
  formdata.set('date', date.value)
  formdata.set('desc', desc.value)
  formdata.set('data', contents.value)
  urllst = window.location.href.split("/")
  fetch('/saveeditpost/' + urllst[urllst.length - 1], {
    method: 'post',
    body: formdata
  }).then(function(response) {
    return response.text()
  }).then(function(data) {
    console.log(data)
    if (data == "success") {
      var d = new Date();
      date = d.toLocaleString();       
      document.getElementById('savenotif').innerHTML = '<p style = "line-height: 36px; color: black;">Saved at: ' + date + ' </p>'
    } else {
      document.getElementById('savenotif').innerHTML = '<p style = "line-height: 36px; color: red;">Save Error!</p>'
    }
  })
}

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

let savebut = document.getElementById("savebut")
savebut.addEventListener('click', function() {
  save();
})

// Check for unsaved data
window.onbeforeunload = function() {
  if (change.length() > 0) {
    return 'There are unsaved changes. Are you sure you want to leave?';
  }
}