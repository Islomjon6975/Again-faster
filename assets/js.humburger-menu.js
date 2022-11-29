const openMenu = document.querySelector('.humburger-menu');
const closeMenu = document.querySelector('.close-humburger-menu');
const humburgerContainer = document.querySelector('.humburger__container');
openMenu.addEventListener('click', () => {
    humburgerContainer.style.display = 'flex'
})

closeMenu.addEventListener('click', () => {
    humburgerContainer.style.display = 'none'
})