

  
  const pintarEncontrados = (encontrados) => {
    document.getElementById('all_events_container').innerHTML = '';
    document.getElementById('searched_container').innerHTML = '';

    const sectionEncontrados = document.getElementById('searched_container');
    const articleEncontrados = document.createElement('ARTICLE');
    
    const fragment = document.createDocumentFragment();
  
    encontrados.forEach(element => {
      const pEvento = document.createElement('P');
      const pDescripcion = document.createElement('P');
      const pFecha = document.createElement('P');
      const pEnlace = document.createElement('P');
      const poster = document.createElement('IMG');
  
      pEvento.innerText = element.event_name;
      pDescripcion.innerText = element.description;
      const fecha =new Date (element.date_start);
      pFecha.innerText = fecha.toDateString();
      pEnlace.innerHTML = `<a href=${element.url} target='_blank'>Más información</a>`;
      poster.src = element.poster;
      poster.alt = element.event_name;
      poster.width = "300";
  
      fragment.append(pEvento, pDescripcion, pFecha, pEnlace, poster);
      articleEncontrados.append(fragment);
      sectionEncontrados.append(articleEncontrados)
    });
  
  }
  



  document.getElementById("filterButton").addEventListener("click", async () => {
    console.log('Botón pulsado')
    const input = document.getElementById("filterInput").value;
    console.log(input);
    try {
      const response = await fetch(`http://localhost:3000/search?input=${input}`)
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const events = await response.json();
      console.log('Eventos encontrados:', events);
      pintarEncontrados(events);
    } catch (error) {
      console.error('Error:', error);
    }  });

    document.querySelector(".btnCerrarSesion").addEventListener("click", ()=>{
      const last_time_logged = new Date(Date.now());
      console.log(last_time_logged);
      /*await fetch ('http://localhost:3000/users?email=sergio@admin.com',
        {
          method: 'PUT',


        }
      )*/
      document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'  
      document.location.href = "/"
});

//   const hamburgerMenu = document.getElementById('hamburger-menu');
//   const navLinks = document.getElementById('nav-links');

//   hamburgerMenu.addEventListener('click', () => {
//       navLinks.classList.toggle('active');
//   });
  
// const paintDinamicFooter = ()=>{
//   const footer = document.getElementById('footer');
//   const footerOptions = [
//       "<p>Luis Carlos. Todos los derechos reservados.</p>",
//       "<p>Stephani. Todos los derechos reservados.</p>",
//       "<p>Sergio. Todos los derechos reservados.</p>"
//   ];
//   const random = Math.floor(Math.random() * footerOptions.length);
//   footer.innerHTML = footerOptions[random];
// }
// paintDinamicFooter();