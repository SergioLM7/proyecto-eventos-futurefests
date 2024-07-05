document.getElementById("createEvent").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("https://proyecto-eventos-futurefests.onrender.com/api/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            event_name: e.target.children.event_name.value,
            description: e.target.children.description.value,
            date_start: e.target.children.date_start.value,
            date_end: e.target.children.date_end.value,
            url: e.target.children.url.value,
            poster: e.target.children.poster.value
        })
    });
    // if (!res.ok) return mensajeError.classList.toggle("hidden", false);
    // const resJson = await res.json();
    // if (resJson.redirect) {
    //     window.location.href = resJson.redirect;
    // }
});

document.querySelector('.buttonScrap').addEventListener('click', async () => {
    try {
        const response = await fetch('https://proyecto-eventos-futurefests.onrender.com/scraping/eventbrite', { method: 'POST' });
        const result = await response.json();
        console.log('Scraping completado y datos guardados en MongoDB:', result);
        window.location.href = '/';
    } catch (error) {
        console.error('Fallo en el scraping:', error);
    }
});