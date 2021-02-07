import { readable } from 'svelte/store'
import type { AppData } from '~/typings'

const appInfo: AppData = {
  name: 'FileShare',
  description: 'Share files on your local network'
}

export const appData = readable(appInfo, () => { })