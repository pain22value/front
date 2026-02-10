import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
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
