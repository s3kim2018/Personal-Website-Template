let home = document.getElementById("home")
let about = document.getElementById('about')
let blog = document.getElementById('blog')
let projects = document.getElementById('projects')
let contact = document.getElementById('contact')

console.log("loaded")


let currentelem = 'home'
function changemenu(val) {
    if (val == currentelem) {
        return;
    } else {
        if (val == 'home') {
            document.getElementById(val).style.backgroundSize = '10% 0.1em';
        } else if (val == 'about') {
            document.getElementById(val).style.backgroundSize = '18% 0.1em';
        } else if (val == 'blog') {
            document.getElementById(val).style.backgroundSize = '9% 0.1em';
        } else if (val == "projects") {
            document.getElementById(val).style.backgroundSize = '15% 0.1em';
        } else if (val == 'contact') {
            document.getElementById(val).style.backgroundSize = '20% 0.1em';
        }
        document.getElementById(currentelem).style.backgroundSize = '0%';
        currentelem = val
    }
}
home.addEventListener('click', function() {
    changemenu('home')})
about.addEventListener('click', function() {
    changemenu('about')})
blog.addEventListener('click', function() {
    changemenu('blog')})
projects.addEventListener('click', function() {
    changemenu('projects')})
contact.addEventListener('click', function() {
    changemenu('contact')})
