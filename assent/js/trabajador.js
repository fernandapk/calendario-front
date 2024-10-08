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
