import { defineConfig } from 'rn-bootloader'

export default defineConfig([
  {
    name: 'Setup CodePush',
    phase: 'post',
    blocking: false,
    run: async () => {
      await new Promise(() => setTimeout( () => console.log('[BOOT] Setting up CodePush...'), 3000))
    },
  },
  {
    name: 'Load Fonts',
    phase: 'postUI',
    blocking: false,
    run: async () => {
      
      await new Promise(() => setTimeout(() => console.log('[BOOT] Loading fonts...'), 2000))
    },
    retry: 2,
    timeout: 2000,
  },
  {
    name: 'Init Redux Store',
    phase: 'pre',
    blocking: true,
    run: async () => {
      await new Promise(() => setTimeout(() => console.log('[BOOT] Initializing Redux...'), 500)) // simulate async
    },
  },
])
