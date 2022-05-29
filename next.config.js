/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media0.giphy.com',
      'media1.giphy.com',
      'nawpaeoevbjzsksiablk.supabase.co',
      'nawpaeoevbjzsksiablk.supabase.in',
      'lh3.googleusercontent.com'
    ]
  }
};

module.exports = nextConfig;
