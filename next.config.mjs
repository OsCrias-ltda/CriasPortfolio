/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  
};

export default nextConfig;
