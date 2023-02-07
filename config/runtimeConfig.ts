import getConfig from 'next/config'

interface IRuntimeConfig {
  HOST: string
  ROBOTS_FILE: string
  NODE_ENV: 'development' | 'production'
  DEV: boolean
  PROD: boolean
  MAP_KEY: string
  CACHE_TIME_HOURS: number
  BOOKING_COMPLETE_ANYTIME: boolean
}

interface IServerRuntimeConfig {
  HOST_INNER?: string
  ROBOTS_FILE: string
  API_FRONTEND_TOKEN: string
}

function getRuntimeConfig(): IRuntimeConfig {
  const { publicRuntimeConfig } = getConfig()
  return publicRuntimeConfig
}

function getServerRuntimeConfig(): IServerRuntimeConfig {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig
}

export const runtimeConfig = getRuntimeConfig()

export const serverRuntimeConfig = getServerRuntimeConfig()
