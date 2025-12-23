/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**',
      },
    ],
  },
  // Webpack configuration to fix undici issue with Firebase
  webpack: (config, { isServer }) => {
    // Fix for undici private class fields
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Exclude undici from webpack compilation
    config.externals = [...(config.externals || []), 'undici'];
    
    return config;
  },
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Transpile specific packages
  transpilePackages: ['firebase', '@firebase/storage'],
}

module.exports = nextConfig
