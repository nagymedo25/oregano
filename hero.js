// open and close header //
let toggle = document.getElementById('toggel');
let closeBtn = document.getElementById('close');
let ul = document.getElementById('ul');
let hero = document.getElementById('1');
let scrollBtn = document.getElementById('scroll');

// get ul elements //

let ul_elements = document.getElementsByClassName('a');



toggle.addEventListener('click' , function() {
    ul.className = 'active-ul'
    document.body.style.overflow = 'hidden';  
})

closeBtn.addEventListener('click' , function() {
    ul.className = 'close-ul'
    document.body.style.overflow = 'scroll';  
})


for(let i = 0 ; i < ul_elements.length ; i++) {
    ul_elements[i].onclick = function(){
        ul.className = 'close-ul'
        document.body.style.overflow = 'scroll';  
    }
}


// scroll btn //

setInterval(() => {
    if(window.scrollY >= 1100) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }  
}, 100);


// scroll //

scrollBtn.onclick = function() {
    window.scrollTo({
        top: 0,
    });
}
