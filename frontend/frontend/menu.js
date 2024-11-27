// menu.js
document.getElementById('menuToggle').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que se recargue la página
    var menu = document.getElementById('dropdownMenu');

    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {

        menu.style.display = 'none';
    }
});
