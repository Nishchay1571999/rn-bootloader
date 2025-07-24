/**
 * Retry & timeout wrapper
 */


export async function runWithRetryAndTimeout<T>(
    task: () => Promise<T>,
    options: { timeout?: number; retries?: number } = {}
  ): Promise<T> {
    const { timeout = 8000, retries = 0 } = options
  
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const result = await Promise.race([
          task(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Task timeout')), timeout)
          ),
        ])
        return result
      } catch (err) {
        if (attempt === retries) throw err
      }
    }
  
    throw new Error('Unhandled task failure')
  }
  