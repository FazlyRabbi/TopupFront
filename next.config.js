/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,PATCH,DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  images: {
    unoptimized: true,
    domains: ["localhost"],
  },

  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BKASH_API_URL: process.env.BKASH_API_URL,
    APP_KEY: process.env.APP_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    APP_SECRET: process.env.APP_SECRET,
    BKASH_USERNAME: process.env.BKASH_USERNAME,
    BKASH_PASSWORD: process.env.BKASH_PASSWORD,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // future: {
  //   webpack5: true,
  // },

  webpack: (config) => {
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    };

    // Optional: Adding any other custom Webpack configurations
    // config.resolve = {
    //   ...config.resolve,
    //   // Custom alias or other configurations
    // };

    return config;
  },
};

module.exports = nextConfig;

process.noDeprecation = true;
