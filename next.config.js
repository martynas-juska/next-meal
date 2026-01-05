/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        minimumCacheTTL: 60,
        remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jchlcjsvrtwahmkzpoar.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
       ],
    },
  // Enable compression
    compress: true,
  // Optimize production builds
     productionBrowserSourceMaps: false,
}

module.exports = nextConfig
