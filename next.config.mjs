/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["three"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$|\.frag$|\.vert$/i,
      use: ["raw-loader", "glslify-loader"],
    });
    return config;
  },
};

export default nextConfig;
