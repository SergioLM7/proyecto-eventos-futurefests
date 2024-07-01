const mensajeError = document.getElementsByClassName("error")[0];
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: e.target.children.email.value,
            password: e.target.children.password.value,
            first_name: e.target.children.first_name.value,
            last_name: e.target.children.last_name.value
        })
    });
    if (!res.ok) return mensajeError.classList.toggle("hidden", false);
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }
});
