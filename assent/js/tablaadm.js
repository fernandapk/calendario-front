
document.addEventListener("DOMContentLoaded",  init);

document.getElementById("nuevoTrabajadorForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let contraseña = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;
    let url_img = document.getElementById("url_img").value;

    const url = "https://calendario-bak.onrender.com/registrotrabajador";  
    const data = {
        emailEmpresa: localStorage.getItem("email"), 
        username: nombre, 
        email: email, 
        password: contraseña,
        url_img: url_img
    };

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (respuesta.ok) {
            alert("Registro exitoso");
            cargarTrabajadores(); 
            nombre = document.getElementById("nombre").value = "";
            contraseña = document.getElementById("contraseña").value = "";
            email = document.getElementById("email").value = "";
            url_img = document.getElementById("url_img").value = "";
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
    const url = "https://calendario-bak.onrender.com/obtenertrabajadores";  // URL de tu servidor para obtener los trabajadores

    try {
        const email = localStorage.getItem("email");
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailEmpresa: email })
        });



        if (!respuesta.ok) {
            alert("Error al cargar trabajadores");
        }

        const trabajadores = await respuesta.json();

        const tbody = document.getElementById("trabajadores").getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";  // Limpiar el contenido actual de la tabla

        trabajadores.forEach(trabajador => {
            let row = tbody.insertRow();
            let cellAvatar = row.insertCell(0);
            let cellNombre = row.insertCell(1);
            let cellEmail = row.insertCell(2);
            let cellContraseña = row.insertCell(3);

            let cellEliminar = row.insertCell(3);
            
            // botón eliminar
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "btn-danger";
            botonEliminar.onclick = async function() {
                if (confirm("¿Estás seguro de eliminar a " + trabajador.email + "?")) {
                    const url = "https://calendario-bak.onrender.com/eliminartrabajador";  // URL de tu servidor para eliminar trabajadores
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
            cellAvatar.innerHTML = `<img 
            onerror="this.src='https://cdn-icons-png.flaticon.com/256/6997/6997662.png';"
            src="${trabajador.url_img}" alt="${trabajador.username}" class="card-image-user  "> `;
            // agregar clase td-center
            cellAvatar.classList.add("td-center");
            cellNombre.innerHTML = trabajador.username;
            cellEmail.innerHTML = trabajador.email;
            cellContraseña.innerHTML = trabajador.contraseña;  // Cambiado de innerHtml a innerHTML
            
            let elementoTotalTransacciones = document.getElementById("totalTrabajadores");
            elementoTotalTransacciones.innerHTML = trabajadores.length;
        
        });
    } catch (error) {
        console.error("Error al cargar trabajadores:", error);
    }
}

async function init() {
    let email = localStorage.getItem("email");
    let rol = localStorage.getItem("rol");
    let elemento = document.getElementById("nombreAdmin");
    
    if (email == null || rol != "administrador") {
        window.location.href = "../login.html";
    }

    elemento.innerHTML = email;

    //cargar trabajadores
    cargarTrabajadores();

    //cargar resumen general


}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    window.location.href = "../login.html";
}

// Función para cargar resumen general
async function cargarResumenGeneral() {    
    // aca va la logica para cargar el resumen general
}