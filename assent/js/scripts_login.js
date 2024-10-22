document.getElementById("formulario-login").addEventListener("submit", async function (event) {
    event.preventDefault();

    let email = document.getElementById("username").value;
    let contraseña = document.getElementById("password").value;

    const url = "http://localhost:5000/login";  // URL de tu servidor de registro (cambia a http://localhost:5000 si no estás usando HTTPS)

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: contraseña })
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            console.log("Datos recibidos del servidor:", data);

            if (data.rol === "usuario") {
                console.log("Rol: usuario");
                window.location.href = '../../pages/app/empresas.html';
            } else if (data.rol === "administrador") {
                console.log("Rol: administrador");
                window.location.href = '../../pages/app/tablaadmi.html';
            } else if (data.rol === "trabajador") {
                localStorage.setItem("correo", data.correo);
                console.log("Rol: trabajador");
                window.location.href = '../../pages/trabajador.html';
            } else {
                console.log("Rol no reconocido");
                alert("Usuario sin permisos"); // Asegúrate de que el servidor envíe un campo 'message' en la respuesta
            }
        } else {
            console.log("Respuesta no ok:", respuesta);
            throw new Error("Error al iniciar sesión :(");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Por favor, inténtalo nuevamente.");
    }
});
