/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // adicionar menu da classe
       nav.classList.toggle('show-menu')

       // adicionar ícone de entrar e sair
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')