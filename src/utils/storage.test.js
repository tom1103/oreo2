import test from 'node:test'
import assert from 'node:assert'
import { storageAvailable } from './storage.js'

// Mock DOMException
class MockDOMException extends Error {
    constructor(message, name, code) {
        super(message)
        this.name = name
        this.code = code
    }
}

// Helper to set up mock window
function setupMockWindow(storageMocks = {}) {
    global.window = {
        ...storageMocks,
    }
    global.DOMException = MockDOMException
}

test('storageAvailable returns true when storage is available and functional', () => {
    const mockStorage = {
        setItem: () => {},
        removeItem: () => {},
    }
    setupMockWindow({ localStorage: mockStorage })

    assert.strictEqual(storageAvailable('localStorage'), true)
})

test('storageAvailable returns true when storage is available (sessionStorage)', () => {
    const mockStorage = {
        setItem: () => {},
        removeItem: () => {},
    }
    setupMockWindow({ sessionStorage: mockStorage })

    assert.strictEqual(storageAvailable('sessionStorage'), true)
})

test('storageAvailable returns false when storage is not supported', () => {
    setupMockWindow({ localStorage: undefined })
    assert.strictEqual(storageAvailable('localStorage'), false)
})

test('storageAvailable returns false when storage access throws SecurityError', () => {
    global.window = {
        get localStorage() {
            throw new Error('SecurityError')
        },
    }
    assert.strictEqual(storageAvailable('localStorage'), false)
})

test('storageAvailable returns true on QuotaExceededError if storage has items (e.g. Chrome/Safari)', () => {
    const mockStorage = {
        length: 1,
        setItem: () => {
            throw new MockDOMException('Quota exceeded', 'QuotaExceededError', 22)
        },
        removeItem: () => {},
    }
    setupMockWindow({ localStorage: mockStorage })

    assert.strictEqual(storageAvailable('localStorage'), true)
})

test('storageAvailable returns true on QuotaExceededError if storage has items (Firefox code)', () => {
    const mockStorage = {
        length: 5,
        setItem: () => {
            throw new MockDOMException('Quota exceeded', 'NS_ERROR_DOM_QUOTA_REACHED', 1014)
        },
        removeItem: () => {},
    }
    setupMockWindow({ localStorage: mockStorage })

    assert.strictEqual(storageAvailable('localStorage'), true)
})

test('storageAvailable returns false on QuotaExceededError if storage is empty', () => {
    const mockStorage = {
        length: 0,
        setItem: () => {
            throw new MockDOMException('Quota exceeded', 'QuotaExceededError', 22)
        },
        removeItem: () => {},
    }
    setupMockWindow({ localStorage: mockStorage })

    assert.strictEqual(storageAvailable('localStorage'), false)
})

test('storageAvailable returns false for other DOMExceptions', () => {
    const mockStorage = {
        length: 1,
        setItem: () => {
            throw new MockDOMException('Hierarchy request error', 'HierarchyRequestError', 3)
        },
        removeItem: () => {},
    }
    setupMockWindow({ localStorage: mockStorage })

    assert.strictEqual(storageAvailable('localStorage'), false)
})
