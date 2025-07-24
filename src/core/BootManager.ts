/**
 * Boot task registry
 * Phase runner
 * Task status tracking
 * 
 */

import type { BootPhase, BootTask } from './defineBootTask'
import { runWithRetryAndTimeout } from './taskUtils'

type TaskStatus = 'pending' | 'running' | 'success' | 'failure' | 'timeout'

type BootTaskStatus = {
  name: string
  phase: BootPhase
  status: TaskStatus
  duration: number
  error?: string
}

class BootManager {
  private registry: BootTask[] = []
  private statuses = new Map<string, BootTaskStatus>()

  register(task: BootTask) {
    this.registry.push(task)
    this.statuses.set(task.name, {
      name: task.name,
      phase: task.phase,
      status: 'pending',
      duration: 0,
    })
  }

  async runPhase(phase: BootPhase) {
    const tasks = this.registry.filter(task => task.phase === phase)

    const blockingTasks = tasks.filter(t => t.blocking)
    const nonBlockingTasks = tasks.filter(t => !t.blocking)


    await Promise.all([
      ...blockingTasks.map(task => {
        this.runTask(task)
      }),
      ...nonBlockingTasks.map(task => {
        this.runTask(task, true)
      }),
    ])
  }

  private async runTask(task: BootTask, isBackground = false) {
    const start = Date.now()
    const status = this.statuses.get(task.name)
    if (!status) return

    status.status = 'running'
    const runner = async () => {
      await runWithRetryAndTimeout(() => Promise.resolve(task.run()), {
        timeout: task.timeout,
        retries: task.retry,
      })
    }

    const exec = async () => {
      try {
        await runner()
        status.status = 'success'
      } catch (err) {
        status.status =
          (err as Error).message === 'Task timeout' ? 'timeout' : 'failure'
        status.error = (err as Error).message
      } finally {
        status.duration = Date.now() - start
        this.statuses.set(task.name, { ...status })
      }
    }

    if (isBackground) {
      void exec()
    } else {
      await exec()
    }
  }

  getStatuses(): BootTaskStatus[] {
    return Array.from(this.statuses.values())
  }

  getSummary() {
    const stats = this.getStatuses()
    const totalTime = stats.reduce((acc, s) => acc + s.duration, 0)
    return {
      totalTime,
      statuses: stats,
    }
  }

  reset() {
    this.registry = []
    this.statuses.clear()
  }
}

// Singleton instance
export const bootManager = new BootManager()
