document.getElementById("formulario-registro").addEventListener("submit", async function(event) {
    event.preventDefault();
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("pass").value;

    const url = "http://localhost:5000/registro";  // URL de tu servidor de registro (cambia a http://localhost:5000 si no estás usando HTTPS)

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: nombre, 
                email: email, 
                password: contraseña,
                rol : 'usuario'
             })
        });

        if (respuesta.ok) {
            alert(respuesta.registrado);
            const data = await respuesta.json();
            alert(data.rol); // Asegúrate de que el servidor envíe un campo 'message' en la respuesta
            if (data.rol="usuario"){
             window.location.href = './calendario.html';

            }
        } else {
            throw new Error("Error en el registro");
        }
    } catch (error) {
        console.error("Error al intentar registrar:", error);
        alert("Error al intentar registrar. Por favor, inténtalo nuevamente.");
    }
    
});

