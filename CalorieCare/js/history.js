var day = dateObj.getUTCDate();
var daynext = dateObj.getUTCDate()+1;
var darpre = dateObj.getUTCDate()-1;

function getThaiDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const thaiDate = now.toLocaleDateString('th-TH', options);

  // Convert to Buddhist year (add 543 to the current year)
  const buddhistYear = now.getFullYear() + 543;

  // Replace the year with the Buddhist year
  const formattedDate = thaiDate.replace(now.getFullYear(), buddhistYear);
  return formattedDate;
}

// Update the date in the "currentDate" span
document.getElementById('currentDate').textContent = 'วันนี้, ' + getThaiDate();
function displayCurrentDate() {
  const now = new Date();

  // Get day, month, and year in Thai format
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const thaiDate = now.toLocaleDateString('th-TH', options);
 
  // Update the span with the current date
  document.getElementById('currentDate').textContent = 'วันนี้, ' + thaiDate;
}

// Call the function on page load
displayCurrentDate();
let selectedDate = new Date(); // Initialize the selected date

// Function to format the date in Thai format
function formatThaiDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('th-TH', options);
}

// Function to display the current date
function displayCurrentDate() {
    const thaiDate = formatThaiDate(selectedDate);
    document.getElementById('currentDate').textContent = 'วันนี้, ' + thaiDate;
}

// Call displayCurrentDate initially to show today's date
displayCurrentDate();

// Event listener for the previous button
document.getElementById('prevBtn').addEventListener('click', () => {
    selectedDate.setDate(selectedDate.getDate() - 1); // Subtract 1 day
    displayCurrentDate(); // Update the displayed date
});

// Event listener for the next button
document.getElementById('nextBtn').addEventListener('click', () => {
    selectedDate.setDate(selectedDate.getDate() + 1); // Add 1 day
    displayCurrentDate(); // Update the displayed date
});
function redirectToSearch() {
  window.location.href = "search.html";
}

