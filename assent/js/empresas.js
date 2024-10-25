
// Función para obtener empresas y crear tarjetas
async function fetchEmpresas() {
    try {
        const response = await fetch('https://calendario-bak.onrender.com/obtener-empresas');
        if (!response.ok) throw new Error('Error al obtener las empresas');

        const empresas = await response.json();
        const cardContainer = document.getElementById('cardContainer');

        empresas.forEach(empresa => {
            //{correo: 'administrador@gmail.com', nombre_empresa: 'Barberia los tesos', url_img: 'https://images.pexels.com/photos/1813272/pexels-ph…jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
            //console.log(empresa);
            const card = document.createElement('div');
            card.className = 'card';
            console.log(empresa.url_img);
            card.innerHTML = `
                <img src="${empresa.url_img}"
                onerror="this.src='https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg';"

                 alt="${empresa.nombre_empresa}" class="card-image">
                <h2>${empresa.nombre_empresa}</h2>
                <button 
                    onclick="window.location.href='pages/app/empleados.html?correoEmpresa=${empresa.correo}'"

                class="visit-button">Visitar</button>
            `;
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
    
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchEmpresas);


// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    window.location.href = "../login.html";
}