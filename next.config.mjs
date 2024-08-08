/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "bxdxvaioiunezestlkri.supabase.co",
        },
        {
            protocol: "https",
            hostname: "letsenhance.io",
        },
    ]
  },
};

export default nextConfig;
