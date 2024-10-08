document.addEventListener('DOMContentLoaded', function () {
    const calendarDates = document.getElementById('calendar-dates');
    const monthYear = document.getElementById('month-year');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const showSelectedButton = document.getElementById('show-selected');
    const horafin = document.getElementById('fin-time');
    const horaini = document.getElementById('ini-time');
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDays = [];

    function renderCalendar(month, year) {
        3
        calendarDates.innerHTML = '';
        monthYear.textContent = `${months[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const currentDay = today.getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDates.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = document.createElement('div');
            dateDiv.textContent = day;
            dateDiv.classList.add('calendar-date');
            if (isCurrentMonth && day === currentDay) {
                dateDiv.classList.add('current-day');
            }
            calendarDates.appendChild(dateDiv);
        }
    }

    function toggleSelectDay(element, day) {
        if (element.classList.contains('selected-day')) {
            element.classList.remove('selected-day');
            selectedDays = selectedDays.filter(selectedDay => selectedDay !== day);
        } else {
            element.classList.add('selected-day');
            selectedDays.push(day);
        }
    }

    calendarDates.addEventListener('click', function (event) {
        if (event.target.classList.contains('calendar-date')) {
            const day = parseInt(event.target.textContent);
            toggleSelectDay(event.target, day);
        }
    });

    showSelectedButton.addEventListener('click', async () => {
        
        const turno = {
            horafin: horafin.value,
            horainicio: horaini.value,
            diasseleccionados: selectedDays,
            
        };
    
        const url = "http://localhost:5000/registro_turno";
        
            const respuesta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(turno)
            });
    
            if (respuesta.ok) {
                alert("Registro exitoso");
            } else {
                alert("Error en el registro");
            }
        
    });
    

    prevMonth.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});
