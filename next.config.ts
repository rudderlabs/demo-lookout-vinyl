import type { NextConfig } from 'next';

const repoBase = '/demo-lookout-vinyl';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: repoBase,
  assetPrefix: repoBase,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
