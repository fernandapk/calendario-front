document.getElementById("formulario-login").addEventListener("submit", async function (event) {
    event.preventDefault();

    let email = document.getElementById("username").value;
    let contraseña = document.getElementById("password").value;

    const url = "https://calendario-bak.onrender.com/login";  // URL de tu servidor de registro (cambia a https://calendario-bak.onrender.com si no estás usando HTTPS)

     const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: contraseña })
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        
        
       localStorage.setItem("email", email);
        if (data.rol === "usuario") {
            localStorage.setItem("rol", "usuario");
            window.location.href = '/calendario-front/pages/app/empresas.html';
        } else if (data.rol === "administrador") {
            localStorage.setItem("rol", "administrador");
            window.location.href = '/calendario-front/pages/app/tablaadmi.html';
        } else if (data.rol === "trabajador") {
            localStorage.setItem("rol", "trabajador");
            console.log("Rol: trabajador");
            window.location.href = '/calendario-front/pages/app/trabajador.html';
        } else {
            console.log("Rol no reconocido");
            alert("Usuario sin permisos"); // Asegúrate de que el servidor envíe un campo 'message' en la respuesta
        }
    } else {
        console.log("Respuesta no ok:", respuesta);
        alert("Error al iniciar sesión");
    }
    
});
