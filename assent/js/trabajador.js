/*
// Elementos del DOM
const weeklyScheduleForm = document.getElementById('weekly-schedule-form');
const horariosGuardados = document.getElementById('horarios-guardados');
const calendarDates = document.getElementById('calendar-dates');
const monthYearDisplay = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const modifyScheduleBtn = document.getElementById('modify-schedule-btn'); // Botón para modificar horarios
const weeklyScheduleModal = document.getElementById('weekly-schedule-modal'); // Modal de horarios

let currentDate = new Date(); // Fecha actual

// Función para generar el calendario
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    // Mostrar mes y año actual
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    // Calcular el primer día y el último día del mes
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Limpiar los días previos
    calendarDates.innerHTML = '';

    // Crear días vacíos antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        calendarDates.appendChild(emptyCell);
    }

    // Crear los días del mes
    for (let day = 1; day <= lastDateOfMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.classList.add('day');

        // Resaltar el día actual
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.classList.add('highlight'); // Clase para resaltar el día actual
        }

        calendarDates.appendChild(dayCell);

        // Lógica de selección de día
        dayCell.addEventListener('click', () => {
            const selectedDay = document.querySelector('.selected-day');
            if (selectedDay) {
                selectedDay.classList.remove('selected-day');
            }
            dayCell.classList.add('selected-day');
        });
    }
}

// Cambiar de mes
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Mostrar modal de horarios
modifyScheduleBtn.addEventListener('click', () => {
    weeklyScheduleModal.style.display = 'block';
});

// Cerrar el modal si se hace clic fuera del cuadro
window.addEventListener('click', (event) => {
    if (event.target === weeklyScheduleModal) {
        weeklyScheduleModal.style.display = 'none';
    }
});

// Manejar el envío del formulario de horarios
weeklyScheduleForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    // Obtener los valores de cada día
    const lunesStart = document.getElementById('lunes-start').value;
    const lunesEnd = document.getElementById('lunes-end').value;
    const martesStart = document.getElementById('martes-start').value;
    const martesEnd = document.getElementById('martes-end').value;
    const miercolesStart = document.getElementById('miercoles-start').value;
    const miercolesEnd = document.getElementById('miercoles-end').value;
    const juevesStart = document.getElementById('jueves-start').value;
    const juevesEnd = document.getElementById('jueves-end').value;
    const viernesStart = document.getElementById('viernes-start').value;
    const viernesEnd = document.getElementById('viernes-end').value;
    const sabadoStart = document.getElementById('sabado-start').value;
    const sabadoEnd = document.getElementById('sabado-end').value;
    const domingoStart = document.getElementById('domingo-start').value;
    const domingoEnd = document.getElementById('domingo-end').value;

    // Actualizar la tabla con los horarios
    document.getElementById('lunes-inicio').textContent = lunesStart;
    document.getElementById('lunes-fin').textContent = lunesEnd;
    document.getElementById('martes-inicio').textContent = martesStart;
    document.getElementById('martes-fin').textContent = martesEnd;
    document.getElementById('miercoles-inicio').textContent = miercolesStart;
    document.getElementById('miercoles-fin').textContent = miercolesEnd;
    document.getElementById('jueves-inicio').textContent = juevesStart;
    document.getElementById('jueves-fin').textContent = juevesEnd;
    document.getElementById('viernes-inicio').textContent = viernesStart;
    document.getElementById('viernes-fin').textContent = viernesEnd;
    document.getElementById('sabado-inicio').textContent = sabadoStart;
    document.getElementById('sabado-fin').textContent = sabadoEnd;
    document.getElementById('domingo-inicio').textContent = domingoStart;
    document.getElementById('domingo-fin').textContent = domingoEnd;

    // Cerrar el modal después de guardar los horarios
    weeklyScheduleModal.style.display = 'none';
});

// Añadir un evento de clic a todos los botones de editar
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const day = event.target.getAttribute('data-day');

        // Obtener los horarios actuales de la tabla
        const startTime = document.getElementById(`${day}-inicio`).textContent;
        const endTime = document.getElementById(`${day}-fin`).textContent;

        // Llenar el formulario con los horarios actuales
        document.getElementById(`${day}-start`).value = startTime;
        document.getElementById(`${day}-end`).value = endTime;

        // Mostrar el modal
        weeklyScheduleModal.style.display = 'block';
    });
});

// Inicializar el calendario al cargar la página
renderCalendar();


*/
document.addEventListener("DOMContentLoaded", init);

// Pasar el correo del trabajador desde Flask a JS
const correotrabajador = localStorage.getItem("email");
const datePicker = document.getElementById("date-picker");
const diaSeleccionado = document.getElementById("dia-seleccionado");
const currentMonthDiv = document.getElementById("current-month");
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let selectedTimes = {};  // Para almacenar las horas seleccionadas para cada día
let currentSelectedDate = null;  // Para almacenar la fecha seleccionada actualmente

// #################################################################
// #################################################################

// Función para mostrar el mes y el año actuales
function updateMonthDisplay() {
    currentMonthDiv.innerText = `${getMonthName(currentMonth)} ${currentYear}`;
    generateDays(currentMonth, currentYear);
}

// Función para obtener el nombre del mes
function getMonthName(month) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[month];
}

// Función para cambiar el mes
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

// Función para generar los días del mes seleccionado
function generateDays(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    datePicker.innerHTML = ""; // Limpiar los días anteriores

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement("div");
        dateDiv.className = "date";

        // Día de la semana correspondiente al día actual
        const dayOfWeek = new Date(year, month, day).toLocaleDateString('es-ES', { weekday: 'short' });

        dateDiv.innerHTML = `<div class="day-of-week">${dayOfWeek}</div> ${day}`;
        dateDiv.onclick = function () { selectDate(this, day); };

        // Si es el día actual, marcarlo en color rosa
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
            dateDiv.classList.add('current-date');
        }

        datePicker.appendChild(dateDiv);
    }
}



// #################################################################
// #################################################################
function removeTime(index, time) {
   
    const correotrabajador = localStorage.getItem("email");
    const diaSeleccionado = document.getElementById("dia-seleccionado").textContent;
    const data = {
        correo: correotrabajador,  
        dia: diaSeleccionado,        
        hora: time      
    };

    fetch('http://localhost:5000/eliminar-horario', {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.message) {
                recibirHorarios(correotrabajador, diaSeleccionado);
                alert("Horario eliminado exitosamente");  



            } else if (data.error) {
                alert("Error: " + data.error); 
            }
        })
        .catch(error => {
            console.error("Error al eliminar el horario:", error);
        });


}

function addTime() {
    const inputHorario = document.getElementById('input-horario');
    const time = inputHorario.value;

    if (!currentSelectedDate) {
        alert('Por favor, selecciona una fecha.');
        return;
    }
    if (!time) {
        alert('Por favor, selecciona un horario.');
        return;
    }
    enviarHorarioAlServidor(correotrabajador, currentSelectedDate, time);
    recibirHorarios(correotrabajador, currentSelectedDate);
    document.getElementById('input-horario').value = "";   
}

function enviarHorarioAlServidor(correo, dia, hora) {
    const data = {
        correo: correo,  // Correo del trabajador autenticado
        dia: dia,        // Día seleccionado
        hora: hora       // Hora seleccionada
    };

    console.log("Enviando datos al servidor:", data);  // Mostrar datos en la consola

    // Realizar la solicitud al servidor para guardar el horario
    fetch('http://localhost:5000/horarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.message) {
                alert("Horario guardado exitosamente");  // Mostrar mensaje de éxito

            } else if (data.error) {
                alert("Error: " + data.error);  // Mostrar error si ocurre
            }
        })
        .catch(error => {
            console.error("Error al enviar los datos:", error);
        });
}

function selectDate(element, day) {
    const allDates = document.querySelectorAll('.date');
    allDates.forEach(date => {
        date.classList.remove('active');
    });
    element.classList.add('active');

    currentSelectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    diaSeleccionado.innerText = currentSelectedDate;   
    recibirHorarios(correotrabajador, currentSelectedDate);

    // habilitar input-horario,    btn-horario
    document.getElementById('input-horario').disabled = false;
    document.getElementById('btn-horario').disabled = false;
    
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
            timeDiv.innerHTML = `${horaformat} <span class="remove-time" onclick="removeTime(${index}, '${hora}')">Eliminar</span>`;
        } else {
            timeDiv.innerHTML = `${horaformat} <span class="reservado">Reservado</span>`;

        }
        selectedTimesList.appendChild(timeDiv);
    });
}

function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    window.location.href = "../login.html";
}

async function init() {
    let email = correotrabajador;
    let rol = localStorage.getItem("rol");
    let elemento = document.getElementById("nombreTrabajador");

    if (email == null || rol != "trabajador") {
        window.location.href = "../login.html";
    }

    elemento.innerHTML = email;

    // Inicializar el calendario
    updateMonthDisplay();

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