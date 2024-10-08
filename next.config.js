/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
  },

  images: {
    domains: [
      "www.gravatar.com",
      "res.cloudinary.com",
      "www.greengrove.com",
      "plus.unsplash.com",
      "img.icons8.com",
      "beforeigosolutions.com",
      "big-7.png",
    ],
  },
};

module.exports = nextConfig;
