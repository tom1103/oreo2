import test from 'node:test'
import assert from 'node:assert'
import { debounce } from './debounce.js'

test('debounce delays function execution', (t, done) => {
    let callCount = 0
    const debouncedFunc = debounce(() => {
        callCount++
    }, 100)

    debouncedFunc()
    debouncedFunc()
    debouncedFunc()

    assert.strictEqual(callCount, 0)

    setTimeout(() => {
        assert.strictEqual(callCount, 1)
        done()
    }, 150)
})

test('debounce passes arguments correctly', (t, done) => {
    let lastArg = ''
    const debouncedFunc = debounce((arg) => {
        lastArg = arg
    }, 50)

    debouncedFunc('first')
    debouncedFunc('second')

    setTimeout(() => {
        assert.strictEqual(lastArg, 'second')
        done()
    }, 100)
})

test('debounce cancel method prevents execution', (t, done) => {
    let callCount = 0
    const debouncedFunc = debounce(() => {
        callCount++
    }, 50)

    debouncedFunc()
    debouncedFunc.cancel()

    setTimeout(() => {
        assert.strictEqual(callCount, 0)
        done()
    }, 100)
})
