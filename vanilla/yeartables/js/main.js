/**
 * Create an array of a year's worth of dates
 * With the current date centered as close as possible
 * Padded with null to fill out any partial begin/end weeks
 *
 * @param {number} now
 * @returns (number|null)[]
 */
const createDates = now => {
  // Get current month
  // Get day within month
  // Day in first half? Add 6 months left 5 right
  // Day in second half? Add 5 months left 6 right
  // Generate array of year 365 dates
  // Pad beginning & end of array?
};

/**
 * Create a year table, using passed fn for each day's color
 *
 * @param {(number|null)[]} dates
 * @param {(number) => string} getDateColor
 * @returns HTMLTableElement
 */
const createTable = (dates, getDateColor) => {
  if (dates.length % 7) throw new Error("Dates array not divisible by 7");
  const table = document.createElement("table");
  const rows = new Array(7).fill().map(() => document.createElement("tr"));
  rows.forEach(row => table.appendChild(row));
  dates.forEach(date => {
    const obj = new Date(date);
    const row = rows[obj.getDay()];
    const cell = document.createElement("td");
    cell.style.backgroundColor = getDateColor(obj);
    row.appendChild(cell);
  });
  return table;
};
