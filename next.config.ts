import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: process.env.NEXT_PUBLIC_SITE_PREFIX || '',
};

export default nextConfig;
