export type BootTaskStatus = {
    name: string
    phase: 'pre' | 'post' | 'postUI'
    status: 'pending' | 'running' | 'success' | 'error' | 'timeout'
    startedAt?: number
    endedAt?: number
    error?: string
    retries?: number
    timeout?: number
  }
  
  const taskStatuses: BootTaskStatus[] = []
  
  export const bootState = {
    getStatuses: () => [...taskStatuses],
    updateStatus: (name: string, patch: Partial<BootTaskStatus>) => {
      const task = taskStatuses.find((t) => t.name === name)
      if (task) Object.assign(task, patch)
    },
    pushTask: (status: BootTaskStatus) => {
      taskStatuses.push(status)
    },
  }
  