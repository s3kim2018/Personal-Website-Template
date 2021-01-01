let home = document.getElementById("home")
let about = document.getElementById('about')
let blog = document.getElementById('blog')
let projects = document.getElementById('projects')
let contact = document.getElementById('contact')
let posts = document.getElementsByClassName("blogpost");

for (var i = 0; i < posts.length; i++) {
    posts[i].addEventListener("click", function() {
        document.getElementById('blogpage').style.opacity = '0';
        document.getElementById('blogpage').style.height = '0';
        document.getElementById('blogpage').style.overflow = 'hidden';
        document.getElementById('theblogpost').style.opacity = '1';
        document.getElementById('theblogpost').style.height = "100%"
        document.getElementById('theblogpost').style.overflowY = "auto"

    })
}

console.log("loaded")
home.style.backgroundSize = '12% 0.1em';
home.style.color = 'blue';
document.getElementById('homepage').style.opacity = '1'; 
document.getElementById('homepage').style.height = '100%';

let currentelem = 'home'
let pageelem = currentelem + 'page'; 
function changemenu(val) {
    if (val == currentelem) {
        return;
    } else {
        if (val == 'home') {
            home.style.backgroundSize = '12% 0.1em';
            home.style.color = 'blue';
            document.getElementById('homepage').style.opacity = '1'; 
            document.getElementById('homepage').style.height = '100%';
            document.getElementById('homepage').style.overflow = 'hidden';

        } else if (val == 'about') {
            about.style.backgroundSize = '20% 0.1em';
            about.style.color = 'blue';
            document.getElementById('aboutpage').style.opacity = '1'; 
            document.getElementById('aboutpage').style.height = '100%';
            document.getElementById('aboutpage').style.overflowY = 'scroll';
        } else if (val == 'blog') {
            blog.style.backgroundSize = '10% 0.1em';
            blog.style.color = 'blue';
            document.getElementById('blogpage').style.opacity = '1';
            document.getElementById('blogpage').style.height = '100%';
            document.getElementById('blogpage').style.overflowY = 'auto';
        } else if (val == "projects") {
            projects.style.backgroundSize = '16% 0.1em';
            projects.style.color = 'blue';
            document.getElementById('projectspage').style.opacity = '1';
            document.getElementById('projectspage').style.height = '100%';
        } else if (val == 'contact') {
            contact.style.backgroundSize = '22% 0.1em';
            contact.style.color = 'blue';
            document.getElementById('contactpage').style.opacity = '1';
            document.getElementById('contactpage').style.height = '100%';
        }
        document.getElementById(currentelem).style.backgroundSize = '0% 0.1em';
        document.getElementById(currentelem).style.color = 'black';
        document.getElementById(pageelem).style.opacity = '0';
        document.getElementById(pageelem).style.height = '0%' 
        document.getElementById(pageelem).style.overflow = 'hidden'
        currentelem = val
        pageelem = currentelem + 'page'; 
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

function truncateText(selector, maxLength) {
    var element = document.querySelector(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}
//You can then call the function with something like what i have below.
$('.subcontent').html(truncateText('.subcontent', 200))
