const calendar = document.querySelector(".calendar");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector("#prevMonth");
const next = document.querySelector("#nextMonth");
const selectedDaysList = document.querySelector("#selectedDaysList");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const eventsArr = [];
const selectedDays = [];

function initCalendar() {
  // Resto del código para generar el calendario

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
      if (!day.classList.contains('selected')) {
        day.classList.add('selected');
        selectedDays.push(`${activeDay} ${months[month]} ${year}`);
      } else {
        day.classList.remove('selected');
        const index = selectedDays.indexOf(`${activeDay} ${months[month]} ${year}`);
        if (index > -1) {
          selectedDays.splice(index, 1);
        }
      }
      updateSelectedDaysList();
      days.forEach(d => d.classList.remove("active"));
      day.classList.add("active");
    });
  });

  prev.addEventListener("click", prevMonth);
  next.addEventListener("click", nextMonth);
}

function updateSelectedDaysList() {
  selectedDaysList.innerHTML = selectedDays
    .map(day => `<li>${day}</li>`)
    .join("");
}

initCalendar();
