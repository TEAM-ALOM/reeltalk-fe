/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: "http://15.164.226.119:8080/api/movies?sort=releaseDate",
      },
    ];
  },
};

export default nextConfig;
