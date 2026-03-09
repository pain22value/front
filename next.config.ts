import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      // trailing slash 제거 (예: ...:8080/ -> ...:8080)
      const cleanApiUrl = apiUrl?.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

      return [
        {
          source: '/api/:path',
          // 백엔드가 /api로 시작하는 경로를 기대하므로 /api를 명시적으로 넣어야 합니다.
          destination: `${cleanApiUrl}/api/:path`, 
        },
      ];
    },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 또는 특정 패턴: '**.domain.com'
        pathname: "/**", // 전체 경로 허용
      },
    ],
  },
};

export default nextConfig;
