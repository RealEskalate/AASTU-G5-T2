/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://aastu-g5-t2.onrender.com';
    return [
      {
        source: '/api/problems',
        destination: `${apiUrl}/problems`,
      },
    ];
  },
};

export default nextConfig;
