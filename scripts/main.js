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
