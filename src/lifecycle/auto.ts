/**
 * Automatically subscribes to app-ready and runs post/postUI tasks
 */

import { onAppReady } from '../core/events'
import { bootManager } from '../core/BootManager'

onAppReady(() => {
  bootManager.runPhase('post')
  bootManager.runPhase('postUI') // optional
})
