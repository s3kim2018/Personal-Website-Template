let home = document.getElementById("home")
let about = document.getElementById('about')
let blog = document.getElementById('blog')
let projects = document.getElementById('projects')
let contact = document.getElementById('contact')

console.log("loaded")
home.style.backgroundSize = '12% 0.1em';
home.style.color = 'blue';

let currentelem = 'home'
function changemenu(val) {
    if (val == currentelem) {
        return;
    } else {
        if (val == 'home') {
            home.style.backgroundSize = '12% 0.1em';
            home.style.color = 'blue';
        } else if (val == 'about') {
            about.style.backgroundSize = '20% 0.1em';
            about.style.color = 'blue';
        } else if (val == 'blog') {
            blog.style.backgroundSize = '10% 0.1em';
            blog.style.color = 'blue';
        } else if (val == "projects") {
            projects.style.backgroundSize = '16% 0.1em';
            projects.style.color = 'blue';
        } else if (val == 'contact') {
            contact.style.backgroundSize = '22% 0.1em';
            contact.style.color = 'blue';
        }
        document.getElementById(currentelem).style.backgroundSize = '0% 0.1em';
        document.getElementById(currentelem).style.color = 'black';
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
