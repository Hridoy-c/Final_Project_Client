import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // তোমার বাকি config এখানেই থাকবে
};

export default nextConfig;