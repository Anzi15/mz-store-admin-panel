import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'prosemirror-model',
      'prosemirror-transform',
      'prosemirror-state',
      'prosemirror-view',
      'prosemirror-commands',
      'prosemirror-schema-list',
    ],
  },
})
