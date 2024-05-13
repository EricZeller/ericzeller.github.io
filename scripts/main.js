document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('active');

        if (menu.classList.contains('active')) {
            menuToggle.setAttribute('name', 'close');
            menuToggle.style.transition = 'transform 0.3s ease-in-out'; // Animiere die Transformation
            menuToggle.style.transform = 'rotate(180deg)';

        } else {
            menuToggle.setAttribute('name', 'menu');
            menuToggle.style.transition = 'transform 0.3s ease-in-out'; // Animiere die Transformation
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });
});


const observer = new IntersectionObserver((entries => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}));


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


var currentYear = new Date().getFullYear();
document.getElementById("copyright").innerHTML = '<a href="https://github.com/EricZeller" target="_blank"><ion-icon name="logo-github"></ion-icon></a>' + "<br>" + "&#169; " + currentYear + ", all rights reserved.";