/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    HOST_INNER: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    ROBOTS_FILE: process.env.ROBOTS_FILE,
  },
  serverRuntimeConfig: {
    HOST: process.env.HOST,
    HOST_INNER: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    ROBOTS_FILE: process.env.ROBOTS_FILE,
  },
  images: {
    domains: ['api.vsemeda.dev.glob-com.ru', 'api.vsemeda.com'],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24,
  },

  webpack: (config, options) => {
    config.externals.push({
      ymaps3: 'ymaps3',
    })
   return config
  },

}

module.exports = nextConfig
