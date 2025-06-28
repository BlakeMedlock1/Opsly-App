// tamagui.config.ts
import { config as defaultConfig } from '@tamagui/config'
import { createTamagui } from 'tamagui'

const config = createTamagui({
  ...defaultConfig,
})

export type AppConfig = typeof config

export default config

