import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gov.pl",
        port: "",
        pathname: "/photo/**",
      },
    ],
  },
};

export default nextConfig;
