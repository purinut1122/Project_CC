

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const eventModal = document.getElementById('eventModal');
const eventDate = document.getElementById('eventDate');
const eventDescription = document.getElementById('eventDescription');
const saveEventBtn = document.getElementById('saveEventBtn');
let selectedDate = null;

// Generate calendar for the current month
generateCalendar(currentMonth, currentYear);

// Event listener for previous and next buttons
prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
});

// Function to generate the calendar
function generateCalendar(month, year) {
  monthYearElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long' }) + ' ' + year;
  datesElement.innerHTML = '';

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const endDay = lastDayOfMonth.getDate();

  for (let i = 0; i < startDay; i++) {
    const dateElement = document.createElement('div');
    dateElement.classList.add('date');
    datesElement.appendChild(dateElement);
  }

  for (let day = 1; day <= endDay; day++) {
    const dateElement = document.createElement('div');
    dateElement.textContent = day;
    dateElement.classList.add('date');
    if (month === currentDate.getMonth() && year === currentDate.getFullYear() && day === currentDate.getDate()) {
      dateElement.classList.add('current-month');
    }
    dateElement.addEventListener('click', () => openEventModal(year, month, day));
    datesElement.appendChild(dateElement);
  }
}

// Function to open the event modal
function openEventModal(year, month, day) {
    selectedDate = new Date(year, month, day);
    
    // Use toLocaleDateString to format without the day of the week (e.g., no "Thu")
    eventDate.textContent = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Get event description based on selected date
    eventDescription.value = getEventDescription(selectedDate) || '';
    
    // Display the modal
    eventModal.style.display = 'block';
  }
  

// Function to close the event modal
function closeEventModal() {
  eventModal.style.display = 'none';
}

// Function to save the event
function saveEvent() {
  const description = eventDescription.value;
  setEventDescription(selectedDate, description);
 
    
  closeEventModal();
}

// Event listener for save button
saveEventBtn.addEventListener('click', saveEvent);

// Function to get event description from local storage
function getEventDescription(date) {
  const key = date.toDateString();
  return localStorage.getItem(key);
}

// Function to save event description to local storage
function setEventDescription(date, description) {
  const key = date.toDateString();
  localStorage.setItem(key, description);
}

// Event listener for modal close button
const closeBtn = document.getElementsByClassName('close')[0];
closeBtn.addEventListener('click', closeEventModal);

// Event listener for outside modal click
window.addEventListener('click', (event) => {
  if (event.target === eventModal) {
    closeEventModal();
  }
    


    
});
