import { writable } from 'svelte/store'
import type { RootFile } from '../typings'

export const root = writable<RootFile>({ fileLocation: null, serverAddress: null });