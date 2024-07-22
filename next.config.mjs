/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'blog-app-space.sgp1.cdn.digitaloceanspaces.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      }
    ],
  },
};

export default nextConfig;
