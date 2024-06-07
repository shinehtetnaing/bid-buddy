/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pub-c44f6f23b3514b669b6ababbd0271875.r2.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
