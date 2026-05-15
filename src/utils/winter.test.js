import test from 'node:test'
import assert from 'node:assert'
import { isWinter } from './winter.js'

test('isWinter identifies dates in December', () => {
    assert.strictEqual(isWinter(new Date(2024, 11, 15)), false, 'Dec 15 should not be winter')
    assert.strictEqual(isWinter(new Date(2024, 11, 16)), true, 'Dec 16 should be winter')
    assert.strictEqual(isWinter(new Date(2024, 11, 31)), true, 'Dec 31 should be winter')
})

test('isWinter identifies dates in January', () => {
    assert.strictEqual(isWinter(new Date(2025, 0, 1)), true, 'Jan 1 should be winter')
    assert.strictEqual(isWinter(new Date(2025, 0, 15)), true, 'Jan 15 should be winter')
    assert.strictEqual(isWinter(new Date(2025, 0, 31)), true, 'Jan 31 should be winter')
})

test('isWinter identifies dates in February', () => {
    assert.strictEqual(isWinter(new Date(2025, 1, 1)), true, 'Feb 1 should be winter')
    assert.strictEqual(isWinter(new Date(2025, 1, 14)), true, 'Feb 14 should be winter')
    assert.strictEqual(isWinter(new Date(2025, 1, 28)), true, 'Feb 28 should be winter')
    assert.strictEqual(isWinter(new Date(2024, 1, 29)), true, 'Feb 29 (leap year) should be winter')
})

test('isWinter identifies dates in March', () => {
    assert.strictEqual(isWinter(new Date(2025, 2, 1)), true, 'Mar 1 should be winter')
    assert.strictEqual(isWinter(new Date(2025, 2, 5)), true, 'Mar 5 should be winter')
    assert.strictEqual(isWinter(new Date(2025, 2, 6)), false, 'Mar 6 should not be winter')
})

test('isWinter identifies dates in other months', () => {
    assert.strictEqual(isWinter(new Date(2025, 3, 1)), false, 'Apr 1 should not be winter')
    assert.strictEqual(isWinter(new Date(2025, 6, 14)), false, 'Jul 14 should not be winter')
    assert.strictEqual(isWinter(new Date(2025, 9, 31)), false, 'Oct 31 should not be winter')
})
