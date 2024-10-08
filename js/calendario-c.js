const calendar = document.querySelector(".calendario");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventBtn = document.querySelector(".add-event");
const addEventWrapper = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");
const addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const eventsArr = [];
getEvents();

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.textContent = `${months[month]} ${year}`;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event = eventsArr.find(eventObj =>
      eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year
    );

    if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      days += `<div class="day today active ${event ? 'event' : ''}">${i}</div>`;
    } else {
      days += `<div class="day ${event ? 'event' : ''}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListeners();
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

function addListeners() {
  const days = document.querySelectorAll(".day");
  days.forEach(day => {
    day.addEventListener("click", () => {
      activeDay = Number(day.textContent);
      getActiveDay(activeDay);
      updateEvents(activeDay);
      days.forEach(d => d.classList.remove("active"));
      day.classList.add("active");
    });
  });

  prev.addEventListener("click", prevMonth);
  next.addEventListener("click", nextMonth);

  todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
  });

  gotoBtn.addEventListener("click", () => {
    const [m, y] = dateInput.value.split("/");
    if (m && y) {
      month = parseInt(m) - 1;
      year = parseInt(y);
      initCalendar();
    } else {
      alert("Fecha inválida");
    }
  });

  addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
  });

  addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
  });

  addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (eventTitle && eventTimeFrom && eventTimeTo) {
      const event = {
        title: eventTitle,
        time: `${eventTimeFrom} - ${eventTimeTo}`
      };

      let dayEvents = eventsArr.find(eventObj =>
        eventObj.day === activeDay && eventObj.month === month + 1 && eventObj.year === year
      );

      if (dayEvents) {
        dayEvents.events.push(event);
      } else {
        eventsArr.push({
          day: activeDay,
          month: month + 1,
          year: year,
          events: [event]
        });
      }

      saveEvents();
      updateEvents(activeDay);
      addEventWrapper.classList.remove("active");
      addEventTitle.value = "";
      addEventFrom.value = "";
      addEventTo.value = "";

      // Agregar clase "has-event" al día correspondiente
      const activeDayElement = document.querySelector(`.day.active`);
      if (activeDayElement) {
        activeDayElement.classList.add("has-event");
      }
    } else {
      alert("Por favor completa todos los campos del evento.");
    }
  });
}

function getActiveDay(day) {
  const dayDate = new Date(year, month, day);
  eventDay.textContent = dayDate.toLocaleDateString('es-ES', { weekday: 'long' });
  eventDate.textContent = `${day} ${months[month]} ${year}`;
}

function updateEvents(day) {
  const dayEvents = eventsArr.find(eventObj =>
    eventObj.day === day && eventObj.month === month + 1 && eventObj.year === year
  );

  if (dayEvents) {
    let eventsHTML = dayEvents.events.map(event =>
      `<div class="event">
        <div class="title">
          <i class="fas fa-circle"></i>
          <h3 class="event-title">${event.title}</h3>
        </div>
        <div class="event-time">
          <span class="event-time">${event.time}</span>
        </div>
      </div>`
    ).join("");

    eventsContainer.innerHTML = eventsHTML;

    // Agregar clase "has-event" al día correspondiente
    const activeDayElement = document.querySelector(`.day.active`);
    if (activeDayElement) {
      activeDayElement.classList.add("has-event");
    }
  } else {
    eventsContainer.innerHTML = `<div class="no-event"><h3>No hay eventos</h3></div>`;
  }
}

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  const storedEvents = JSON.parse(localStorage.getItem("events"));
  if (storedEvents) {
    eventsArr.push(...storedEvents);
  }
}

initCalendar();
