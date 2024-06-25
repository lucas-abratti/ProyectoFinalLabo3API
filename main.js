const openMenu = document.querySelector('.openMenu')
const closeMenu = document.querySelector('.closeMenu')
const menu = document.querySelector('.menu')

openMenu.addEventListener("click", function() {
  menu.style.display = 'flex'
})

closeMenu.addEventListener("click", function() {
  menu.style.display = 'none'
})



