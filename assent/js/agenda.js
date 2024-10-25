
const correoUsuario = localStorage.getItem("email");  // Obtener el correo del trabajador

// Función para obtener horarios guardados al cargar la página
function fetchSavedSchedules() {
    fetch(`http://localhost:5000/horarios?correo=${correotrabajador}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener horarios');
            }
            return response.json();
        })
        .then(horarios => {
            displaySavedSchedules(horarios);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Función para mostrar los horarios guardados
function displaySavedSchedules(horarios) {
    const selectedTimesList = document.getElementById('selected-times-list');
    selectedTimesList.innerHTML = '<h3>Horarios disponibles</h3>'; // Reiniciar el contenedor

    if (horarios.length === 0) {
        selectedTimesList.innerHTML += '<p>No hay horarios guardados.</p>';
        return;
    }

    horarios.forEach(({ dia, hora }) => {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'selected-time';
        timeDiv.innerHTML = `${dia} - ${hora}`;
        selectedTimesList.appendChild(timeDiv);
    });
}

window.onload = fetchSavedSchedules;

const datePicker = document.getElementById("date-picker");
const currentMonthDiv = document.getElementById("current-month");
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let selectedDate = ""

function updateMonthDisplay() {
    currentMonthDiv.innerText = `${getMonthName(currentMonth)} ${currentYear}`;
    generateDays(currentMonth, currentYear);
}

function getMonthName(month) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[month];
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateMonthDisplay();
}

function generateDays(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    datePicker.innerHTML = ""; // Limpiar los días anteriores

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        const dayOfWeek = new Date(year, month, day).toLocaleDateString('es-ES', { weekday: 'short' });

        dateDiv.innerHTML = `<span class="day-of-week">${dayOfWeek}</span> 
        <h4 class="day-number">${day}</h4>`;
        dateDiv.onclick = function () { selectDate(this, day); };

        datePicker.appendChild(dateDiv);
    }
}

function selectDate(element, day) {
    const allDates = document.querySelectorAll('.date');
    allDates.forEach(date => {
        date.classList.remove('active');
    });
    element.classList.add('active');

    selectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    //diaSeleccionado.innerText = selectedDate;   
    const elementName = document.getElementById('nombre-trabajador');
    const correotrabajador = elementName.dataset.email;

    recibirHorarios(correotrabajador, selectedDate);
    // Llamar a la función para mostrar horarios disponibles para la fecha seleccionada
    //displayAvailableTimes(selectedDate);
}


function recibirHorarios(email, date) {
    const data = {
        correo: email,
        dia: date
    };

    fetch('http://localhost:5000/obtenerhorarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                mostarTiempos(data);
            } else if (data.error) {
                alert("Error: " + data.error);  // Mostrar error si ocurre
            }
        })
        .catch(error => {
            console.error("Error al enviar los datos:", error);
        });
}
function mostarTiempos(dataTimes) {
    const selectedTimesList = document.getElementById('selected-times-list');
    selectedTimesList.innerHTML = "";

    dataTimes.forEach(({ hora, reservadoUsuario }, index) => {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'selected-time';
        horaformat = formatTimeTo12Hour(hora);
        if (!reservadoUsuario) {
            timeDiv.innerHTML = `${horaformat} <span class="reservar-time" onclick="reservar(${index}, '${hora}')">Reservar</span>`;
        } else {
            timeDiv.innerHTML = `${horaformat} <span class="reservado">Reservado</span>`;
        }
        selectedTimesList.appendChild(timeDiv);
    });
}


function reservar(index, time) {

    const elementName = document.getElementById('nombre-trabajador');
    const correotrabajador = elementName.dataset.email;



    const data = {
        correo: correotrabajador,
        dia: selectedDate,
        hora: time,
        correoUsuario: correoUsuario
    };

    fetch('http://localhost:5000/reservar-horario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data.message);
            if (data.message) {
                recibirHorarios(correotrabajador, selectedDate);
                alert("Horario reservado exitosamente");


            } else if (data.error) {
                alert("Error: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error al eliminar el horario:", error);
        });


}


// Formatear la hora en formato de 12 horas
function formatTimeTo12Hour(time24) {
    const [hour, minute] = time24.split(':');
    let hour12 = parseInt(hour, 10);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    hour12 = hour12 % 12 || 12; // Convertir 0 a 12 para medianoche
    return `${hour12}:${minute} ${ampm}`;
}
// Ordenar los tiempos en orden ascendente
function sortTimes(times) {
    return times.sort((a, b) => {
        const [hourA, minuteA] = a.split(':').map(Number);
        const [hourB, minuteB] = b.split(':').map(Number);
        return hourA - hourB || minuteA - minuteB;
    });
}



// Función para mostrar horarios disponibles para una fecha seleccionada
function displayAvailableTimes(selectedDate) {
    const selectedTimesList = document.getElementById('selected-times-list');
    selectedTimesList.innerHTML = '<h3>Horarios disponibles</h3>'; // Reiniciar el contenedor

    fetch(`http://localhost:5000/horarios?correo=${correotrabajador}`)
        .then(response => response.json())
        .then(horarios => {
            // Filtrar los horarios para la fecha seleccionada
            const availableHours = horarios.filter(h => h.dia === selectedDate);
            if (availableHours.length === 0) {
                selectedTimesList.innerHTML += '<p>No hay horarios disponibles para esta fecha.</p>';
                return;
            }

            availableHours.forEach(({ hora }) => {
                const timeDiv = document.createElement('div');
                timeDiv.className = 'selected-time';
                timeDiv.innerHTML = `${selectedDate} - ${hora}`;
                selectedTimesList.appendChild(timeDiv);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

updateMonthDisplay();


async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const correoTrabajador = urlParams.get('correoTrabajador');
    console.log(correoTrabajador);
    const response = await fetch('http://127.0.0.1:5000/obtener-trabajador?correoTrajabador=' + correoTrabajador);
    if (!response.ok) {
        alert('Error al obtener trabajador');
    }

    const trabajador = await response.json();
    //<img id="imagen-trabajador" alt="Imagen del trabajador">
    const imagen = document.getElementById('imagen-trabajador');
    imagen.src = trabajador.url_img;

    // <h3 id="nombre-trabajador">Nombre del trabajador</h3>
    const element = document.getElementById('nombre-trabajador');
    element.innerText = trabajador.nombre;
    element.dataset.email = trabajador.correo;

    const element2 = document.getElementById('nombre-empresa');
    element2.innerText = trabajador.nombreEmpresa;

}

init();

function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    window.location.href = "../login.html";
}
