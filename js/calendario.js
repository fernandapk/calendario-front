document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const modal = document.getElementById("reservationModal");
    const closeModal = document.getElementById("closeModal");
    const selectedDateElement = document.getElementById("selectedDate");
    const reservationForm = document.getElementById("reservationForm");
    const calendarTitle = document.getElementById("calendarTitle");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const optionsTable = document.querySelector(".options-table table");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Datos de ejemplo para días reservados
    const reservedDates = [
        { date: "2024-07-15", service: "peinado" },
        { date: "2024-07-20", service: "uñas" },
        { date: "2024-07-25", service: "pelo" },
        { date: "2024-07-30", service: "tintura" }
    ];

    function renderCalendar(month, year) {
        calendar.innerHTML = `
            <div class="day-name">Lunes</div>
            <div class="day-name">Martes</div>
            <div class="day-name">Miércoles</div>
            <div class="day-name">Jueves</div>
            <div class="day-name">Viernes</div>
            <div class="day-name">Sábado</div>
            <div class="day-name">Domingo</div>
        `;
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarTitle.textContent = `${new Date(year, month).toLocaleString('es-ES', { month: 'long' })} ${year}`;

        let blankDays = (firstDay + 6) % 7; // Ajuste para que el Lunes sea el primer día

        for (let i = 0; i < blankDays; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            calendar.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.classList.add("day");
            day.textContent = i;
            const dateString = `${year}-${month + 1}-${i < 10 ? '0' + i : i}`;
            
            // Verificar si la fecha está reservada y aplicar clase correspondiente
            const reservedDate = reservedDates.find(date => date.date === dateString);
            if (reservedDate) {
                day.classList.add("reserved", reservedDate.service);
            }

            day.addEventListener("click", function() {
                selectedDateElement.textContent = `${i}/${month + 1}/${year}`;
                modal.style.display = "block";
            });
            calendar.appendChild(day);
        }
    }

    prevMonthBtn.addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener("click", function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    reservationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const service = document.getElementById("service").value;
        const time = document.getElementById("time").value;
        const date = selectedDateElement.textContent;

        // Simular guardado de reserva (reemplazar con tu lógica real)
        alert(`Reserva confirmada para ${date}, a las ${time}, para el servicio de ${service}`);

        // Actualizar la visualización del calendario después de la reserva
        const dayElements = calendar.querySelectorAll(".day");
        dayElements.forEach(day => {
            if (day.textContent === date.split("/")[0]) {
                // Eliminar todas las clases de servicio antes de añadir la nueva
                day.classList.remove("peinado", "uñas", "pelo", "tintura");
                day.classList.add("reserved", "uñas");
            }
        });

        modal.style.display = "none";
    });

    renderCalendar(currentMonth, currentYear);
});
