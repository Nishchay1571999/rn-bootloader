/**
 * Event emitter for app lifecycle
 */

import EventEmitter from 'eventemitter3'

export const bootEvents = new EventEmitter()

export function emitAppReady() {
  bootEvents.emit('app-ready')
}

export function onAppReady(cb: () => void) {
  bootEvents.once('app-ready', cb)
}
