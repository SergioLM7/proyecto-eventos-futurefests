console.log('Hola MUndo');

/*document.querySelector(".btnCerrarSesion").addEventListener("click", ({target})=>{
  document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  document.location.href = "/"
}) */

console.log('Hola MUndo 2');

const pintarEncontrados = (encontrados) => {
  document.getElementById('all_events_container').innerHTML = '';
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
    pFecha.innerText = element.date_start;
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
  }
});