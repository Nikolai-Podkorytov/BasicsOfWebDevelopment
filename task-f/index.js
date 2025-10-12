// Author: Nikolai Podkorytov
// Date: 2025-10-12
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const CHECK = '✅';
  const CROSS = '❌';
  const dayOrder = ["Tue", "Fri"]; // match the table headers!

  const form = document.getElementById("addCourseForm");
  const table = document.getElementById("timetable").querySelector("tbody");
  const courseInput = document.getElementById("courseName");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const courseName = courseInput.value.trim() || "Untitled Course";

    // Collect checked days into a Set
    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked'))
        .map((cb) => cb.value)
    );

    // Create new table row
    const row = document.createElement("tr");

    // Course name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = courseName;
    row.appendChild(nameCell);

    // Day cells based on order
    dayOrder.forEach((day) => {
      const cell = document.createElement("td");
      cell.textContent = checkedDays.has(day) ? CHECK : CROSS;
      row.appendChild(cell);
    });

    // Append to table
    table.appendChild(row);

    // Reset form
    form.reset();
    courseInput.focus();
  });
});
