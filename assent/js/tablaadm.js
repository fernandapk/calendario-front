document.addEventListener("DOMContentLoaded", cargarTrabajadores);
document.getElementById("nuevoTrabajadorForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let contraseña = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;

    const url = "http://localhost:5000/registrotrabajador";  // URL de tu servidor de registro

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: nombre, 
                email: email, 
                password: contraseña  // Cambiado de 'contraseña' a 'password'
             })
        });

        if (respuesta.ok) {
            alert("Registro exitoso");
            cargarTrabajadores();  // Actualizar la tabla después de agregar el trabajador
        } else {
            throw new Error("Error en el registro");
        }
    } catch (error) {
        console.error("Error al intentar registrar:", error);
        alert("Error al intentar registrar. Por favor, inténtalo nuevamente.");
    }
});

// Función para cargar trabajadores
async function cargarTrabajadores() {
    const url = "http://localhost:5000/obtenertrabajadores";  // URL de tu servidor para obtener los trabajadores

    try {
        const respuesta = await fetch(url);
        const trabajadores = await respuesta.json();

        const tbody = document.getElementById("trabajadores").getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";  // Limpiar el contenido actual de la tabla

        trabajadores.forEach(trabajador => {
            let row = tbody.insertRow();
            let cellNombre = row.insertCell(0);
            let cellEmail = row.insertCell(1);
            let cellContraseña = row.insertCell(2);

            let cellEliminar = row.insertCell(3);
            
            // botón eliminar
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "btn-danger";
            botonEliminar.onclick = async function() {
                if (confirm("¿Estás seguro de eliminar a " + trabajador.email + "?")) {
                    const url = "http://localhost:5000/eliminartrabajador";  // URL de tu servidor para eliminar trabajadores
                    try {
                        const respuesta = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                email: trabajador.email
                            })
                        });
                        if (respuesta.ok) {
                            alert("Trabajador eliminado");
                            cargarTrabajadores();  // Actualizar la tabla después de eliminar el trabajador
                        } else {
                            throw new Error("Error al eliminar trabajador");
                        }
                    } catch (error) {
                        console.error("Error al intentar eliminar trabajador:", error);
                        alert("Error al intentar eliminar trabajador. Por favor, inténtalo nuevamente.");
                    }
                }
            };
            
            cellEliminar.appendChild(botonEliminar);
            
            cellNombre.innerHTML = trabajador.username;
            cellEmail.innerHTML = trabajador.email;
            cellContraseña.innerHTML = trabajador.password;  // Cambiado de innerHtml a innerHTML
        });
    } catch (error) {
        console.error("Error al cargar trabajadores:", error);
    }
}
