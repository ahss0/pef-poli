/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
        pathname: '/**', // Permite qualquer caminho dentro do Cloudinary
      },
      // Se você ainda quiser testar o Strapi localmente em paralelo:
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
