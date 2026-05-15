/**
 * Checks if a given date falls within the winter period.
 * The winter period is defined from December 16th to March 5th (inclusive).
 *
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is in winter, false otherwise.
 */
export function isWinter(date) {
    const month = date.getMonth() + 1 // getMonth() is zero-based
    const day = date.getDate()

    // Winter period: December 16 to March 5
    // Includes all of January (1) and February (2)
    return (month === 12 && day >= 16) || month === 1 || month === 2 || (month === 3 && day <= 5)
}
