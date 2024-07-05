const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.children.email.value; 
    const password_hash = e.target.children.password_hash.value;
    const res = await fetch("https://proyecto-eventos-futurefests.onrender.com/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password_hash  
        })
    });
    if (!res.ok) return mensajeError.classList.toggle("hidden", false);
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }
});
