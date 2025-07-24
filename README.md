# 🥾 rn-bootloader

> A lightweight and extensible **lifecycle boot manager** for React Native apps.  
Organize, prioritize, and execute startup tasks (e.g. analytics, CodePush, async storage, Redux init) across multiple **phases** — all before or after your app UI is ready.

---

## ✨ Features

- ⚡️ Prioritize critical app boot tasks
- 🪜 Support for multiple sequential **boot phases**
- 🧠 Custom task types: async/sync, timeout, optional, etc.
- ✅ Built-in AppReadyGate
- 🧪 Easy to test & debug during development

---

## 📦 Installation

```bash
yarn add rn-bootloader
```
```bash
pnpm add rn-bootloader
```
```bash
npm install rn-bootloader
```


## 🚀 Quick Start
```jsx
import { AppReadyGate } from 'rn-bootloader'

export default function App() {
  return (
    <AppReadyGate>
      {/* Your app goes here */}
    </AppReadyGate>
  )
}
```
## 🧩 Config Setup example
```ts
import { defineConfig } from 'rn-bootloader'

export default defineConfig([
  {
    name: 'Setup CodePush',
    phase: 'post',
    blocking: false,
    run: () => {
      console.log('[BOOT] Setting up CodePush...')
    },
  },
  {
    name: 'Load Fonts',
    phase: 'postUI',
    blocking: false,
    run: async () => {
      console.log('[BOOT] Loading fonts...')
      await new Promise((res) => setTimeout(res, 300))
    },
    retry: 2,
    timeout: 2000,
  },
  {
    name: 'Init Redux Store',
    phase: 'pre',
    blocking: true,
    run: async () => {
      console.log('[BOOT] Initializing Redux...')
      await new Promise((res) => setTimeout(res, 500)) // simulate async
    },
  },
])

```

### In your index.js before registerRootComponent
```js
import { registerBootTask } from 'rn-bootloader'
import config from "bootloader.config.ts"
registerBootTask(config)
```