/**
 * boot task with metadata
 */


export type BootPhase = 'pre' | 'post' | 'postUI'

export type BootTask = {
  name: string
  phase: BootPhase
  run: () => Promise<void> | void
  blocking?: boolean
  retry?: number
  timeout?: number
}

export function defineBootTask(task: BootTask): BootTask {
  return task
}
