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

// filterButton.addEventListener('click', () => {
//     const filterValue = filterInput.value.toLowerCase();
//     filteredListas = listasGlobal.filter(lista =>
//         lista.list_name.toLowerCase().includes(filterValue)
//     );
//     paintFirstPage(filteredListas);
// });