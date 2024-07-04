//Función para renderizar eventos encontrados en MongoDB Atlas  
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
  

//Evento para filtrar eventos por su nombre
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

//Evento para cerrar sesión
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


/*const getCookie = (email) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + email.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

getCookie();*/

//Función para extraer el token de las cookies
const getCookie = (name)  => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

//Función para extraer el email del token
const getEmailFromToken = () => {
  const token = getCookie("jwt");

  if (!token) {
    console.log("No token found.");
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).email;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

console.log(getEmailFromToken());

//Evento para escuchar el botón favorito y guardar el evento en SQL
const botonesFavoritos = document.querySelectorAll(".buttonFavorite")
botonesFavoritos.forEach(button => {
  button.addEventListener("click", async ({target})=> {
   
    const token = getCookie('jwt')
    if (!token) {
      console.log("No user is logged in.");
      window.relocate.href = '/';
      return;
    }

    const email = getEmailFromToken(token);

      if (target.classList.contains('liked')) {
        target.classList.remove('liked');
      } else {
        target.classList.add('liked');
      }
      //await fetch ('http://localhost:3000/api/search' y le pasamos el target.id para que lo busque----- revisar si crear nuevo modelo searchBy o se puede reutilizar el que ya tenemos para el buscador)
      const payload = {
        email: email,
        favorite_id: target.id
      };

      try {
        const response = await fetch('http://localhost:3000/api/userfavorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
  
      console.log(target.id);
    
  })
})

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