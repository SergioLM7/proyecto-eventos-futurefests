document.querySelector(".btnCerrarSesion").addEventListener("click", ({target})=>{
  document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  document.location.href = "/"
}) 

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  const filterInput = document.querySelector('#filterInput');
  const filterButton = document.querySelector('#filterButton');
  

  hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
  
  paintDinamicFooter();
});

const paintDinamicFooter = ()=>{
  const footer = document.getElementById('footer');
  const footerOptions = [
      "<p>Luis Carlos. Todos los derechos reservados.</p>",
      "<p>Stephani. Todos los derechos reservados.</p>",
      "<p>Sergio. Todos los derechos reservados.</p>"
  ];
  const random = Math.floor(Math.random() * footerOptions.length);
  footer.innerHTML = footerOptions[random];
}