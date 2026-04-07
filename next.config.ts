import type { NextConfig } from "next";
import TerserPlugin from "terser-webpack-plugin";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */

  // ─── [보안] 소스맵 완전 비활성화 ───
  // 매크로 제작자가 .map 파일로 원본 소스 복원하는 것을 차단
  productionBrowserSourceMaps: false,

  // ─── [보안] Turbopack 활성화 시 Webpack 설정 무시 경고 방지 ───
  turbopack: {},

  // ─── [보안] SWC 컴파일러 옵션 ───
  compiler: {
    // production 빌드에서 console.log / console.debug 자동 제거
    // console.error / console.warn 은 유지 (운영 모니터링용)
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // ─── [보안] Webpack 커스텀 설정 ───
  webpack: (config, { isServer, dev }) => {
    // production 클라이언트 빌드에만 적용
    if (!dev && !isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              // dead code 제거
              dead_code: true,
              drop_debugger: true,
              // 조건부 상수 평가 (코드 흐름 분석 어렵게)
              conditionals: true,
              evaluate: true,
              // 사용되지 않는 변수/함수 제거
              unused: true,
            },
            mangle: {
              // 변수명 난독화
              toplevel: true,
              // 예약어 보호 (라이브러리 호환성)
              reserved: ["React", "useState", "useEffect"],
            },
            output: {
              // 주석 제거
              comments: false,
              // ASCII만 사용 (디버깅 어렵게)
              ascii_only: true,
            },
          },
          // 멀티스레드 압축
          parallel: true,
          // 라이선스 파일 추출
          extractComments: false,
        }),
      ];
    }
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localstack",
        port: "4566",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
