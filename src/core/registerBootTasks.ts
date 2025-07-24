/**
 * Loads bootloader.config.ts and registers tasks
 */
import { bootManager } from './BootManager'
import type { BootTask } from './defineBootTask'
export function registerBootTasks(config: BootTask[]) {
  for (const task of config) {
    bootManager.register(task)
  }

  // pre phase
  bootManager.runPhase('pre') // fire and forget
}
