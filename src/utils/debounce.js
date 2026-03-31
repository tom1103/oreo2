/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function & { cancel: () => void }} - The debounced function with a cancel method.
 */
export function debounce(func, wait) {
    let timeout

    const debounced = function (...args) {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }

    debounced.cancel = () => {
        clearTimeout(timeout)
    }

    return debounced
}
