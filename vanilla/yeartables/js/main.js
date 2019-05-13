const HOURS_24_MS = 24 * 60 * 60 * 1000;

/**
 * Create an array of a year's worth of dates
 * With the current date centered as close as possible
 * Padded with null to fill out any partial begin/end weeks
 *
 * @param {number} now
 * @returns (Date|null)[]
 */
const makeDates = now => {
  const date = new Date(now);
  const year = date.getFullYear();
  const month = date.getMonth();

  // Where does current day sit within current month?
  const monthDays = getMonthDays(month, year);
  const monthDay = date.getDate();
  const ratio = monthDay / monthDays;

  // Find start date for our year
  let startMonth = ratio < 0.5 ? month - 6 : month - 5;
  let startYear = year;
  if (startMonth < 0) {
    startMonth += 12;
    startYear -= 1;
  }
  const startDate = new Date(startYear, startMonth, 1, 12);
  const startTime = startDate.getTime();

  // Generate array of 365 dates
  const dates = new Array(365)
    .fill()
    .map((_, i) => new Date(startTime + i * HOURS_24_MS));

  // Pad array to align days with weeks
  const firstWeekDay = dates[0].getDay();
  const lastWeekDay = dates[dates.length - 1].getDay();
  dates.unshift(...new Array(firstWeekDay).fill(null));
  dates.push(...new Array(6 - lastWeekDay).fill(null));

  return dates;
};

/**
 * Create a year table, using passed fn for each day's color
 *
 * @param {(number|null)[]} times
 * @param {(number) => HTMLElement} getDateEl
 * @returns ( table: HTMLTableElement; cells: HTMLTableCellElement[] }
 */
const makeWeekTable = dayCount => {
  if (dayCount % 7) throw new Error(`${dayCount} % 7 has remainder`);
  const table = document.createElement("table");
  const rows = new Array(7).fill().map(() => document.createElement("tr"));
  const cells = new Array(dayCount)
    .fill()
    .map(() => document.createElement("td"));
  cells.forEach((cell, i) => rows[6 - (i % 7)].appendChild(cell));
  rows.forEach(row => table.appendChild(row));
  return { table, cells };
};

/**
 * Get numbers of day in a month
 * @param {number} month 0-11
 * @param {number} year XXXX
 */
const getMonthDays = (month, year) => new Date(year, month + 1, 0).getDate();
