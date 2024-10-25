
// Función para obtener trabajadores y crear tarjetas
async function fetchTrabajadores() {
    const urlParams = new URLSearchParams(window.location.search);
    const correoEmpresa = urlParams.get('correoEmpresa');
    try {
        //const response = await fetch('http://127.0.0.1:5000/obtener-trabajadores');
        const response = await fetch('https://calendario-bak.onrender.com/obtener-trabajadores?correoEmpresa=' + correoEmpresa);

        if (!response.ok) throw new Error('Error al obtener los trabajadores');

        const trabajadores = await response.json();
        const cardContainer = document.getElementById('cardContainer');

        trabajadores.forEach(trabajador => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img 
                 onerror="this.src='https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg';"
                src="${trabajador.url_img}"
                alt="${trabajador.nombre}" class="card-image">
                <h2>${trabajador.nombre}</h2>
                <p>Correo: ${trabajador.correo}</p>
                <button
                    onclick="window.location.href='pages/app/agenda.html?correoTrabajador=${trabajador.correo}'"
                 class="details-button">Ver agenda</button> 
            `;
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchTrabajadores);
