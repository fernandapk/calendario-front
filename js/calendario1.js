// calendario.js
document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const modal = document.getElementById("reservationModal");
    const closeModal = document.getElementById("closeModal");
    const selectedDateElement = document.getElementById("selectedDate");
    const reservationForm = document.getElementById("reservationForm");
    const calendarTitle = document.getElementById("calendarTitle");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const appointmentsList = document.getElementById("appointmentsList");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = null;
    let editIndex = null;

    let reservations = {
        "2024-07-15": [{ service: "peinado", time: "10:00" }],
        "2024-07-20": [{ service: "uñas", time: "12:00" }],
        "2024-07-25": [{ service: "pelo", time: "14:00" }],
        "2024-08-10": [{ service: "tintura", time: "11:00" }]
    };

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

        let blankDays = (firstDay + 6) % 7;

        for (let i = 0; i < blankDays; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            calendar.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.classList.add("day");
            day.textContent = i;
            const dateString = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${i < 10 ? '0' + i : i}`;
            
            const dayReservations = reservations[dateString];
            if (dayReservations && dayReservations.length > 0) {
                day.classList.add("reserved");
                const reservationDetails = document.createElement("div");
                reservationDetails.classList.add("reservation-details");

                dayReservations.forEach((reservation, index) => {
                    const p = document.createElement("p");
                    p.textContent = `${reservation.service} a las ${reservation.time}`;
                    reservationDetails.appendChild(p);

                    const editBtn = document.createElement("button");
                    editBtn.classList.add("edit-btn");
                    editBtn.textContent = "Editar";
                    editBtn.addEventListener("click", function(event) {
                        event.stopPropagation();
                        editAppointment(dateString, index);
                    });
                    reservationDetails.appendChild(editBtn);

                    const deleteBtn = document.createElement("button");
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.textContent = "Eliminar";
                    deleteBtn.addEventListener("click", function(event) {
                        event.stopPropagation();
                        deleteAppointment(dateString, index);
                    });
                    reservationDetails.appendChild(deleteBtn);
                });

                day.appendChild(reservationDetails);
            }

            day.addEventListener("click", function() {
                selectedDate = dateString;
                editIndex = null;
                selectedDateElement.textContent = `${i}/${month + 1}/${year}`;
                modal.style.display = "block";
                renderAppointments();
            });
            calendar.appendChild(day);
        }
    }

    function renderAppointments() {
        appointmentsList.innerHTML = '';
        const dayReservations = reservations[selectedDate] || [];

        dayReservations.forEach((reservation, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${reservation.service} a las ${reservation.time} 
                            <button onclick="editAppointment('${selectedDate}', ${index})">Editar</button>
                            <button onclick="deleteAppointment('${selectedDate}', ${index})">Eliminar</button>`;
            appointmentsList.appendChild(li);
        });
    }

    function editAppointment(dateString, index) {
        const reservation = reservations[dateString][index];
        document.getElementById("service").value = reservation.service;
        document.getElementById("time").value = reservation.time;
        selectedDate = dateString;
        editIndex = index;
        selectedDateElement.textContent = dateString;
        modal.style.display = "block";
    }

    function deleteAppointment(dateString, index) {
        reservations[dateString].splice(index, 1);
        if (reservations[dateString].length === 0) {
            delete reservations[dateString];
        }
        renderCalendar(currentMonth, currentYear);
        renderAppointments();
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

        if (editIndex !== null) {
            reservations[selectedDate][editIndex] = { service, time };
            alert(`Reserva editada para ${selectedDate}, a las ${time}, para el servicio de ${service}`);
        } else {
            if (!reservations[selectedDate]) {
                reservations[selectedDate] = [];
            }
            reservations[selectedDate].push({ service, time });
            alert(`Reserva confirmada para ${selectedDate}, a las ${time}, para el servicio de ${service}`);
        }

        renderCalendar(currentMonth, currentYear);
        renderAppointments();
        modal.style.display = "none";
    });

    // Inicializar el calendario
    renderCalendar(currentMonth, currentYear);
});
