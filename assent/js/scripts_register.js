document.getElementById("formulario-registro").addEventListener("submit", async function (event) {
    event.preventDefault();
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("pass").value;

    const url = "http://localhost:5000/registro";  // URL de tu servidor de registro (cambia a http://localhost:5000 si no estás usando HTTPS)

   
    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: nombre,
            email: email,
            password: contraseña,
        })
    });

    if (respuesta.ok) {
        const data = await respuesta.json();      
        localStorage.setItem("email", email);
        localStorage.setItem("rol", "usuario");
        alert(data.message);
        window.location.href = '../../pages/app/empresas.html';        
    } else {
        alert("Error al registrar");
    }


});

