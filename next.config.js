module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  env: {
    NEXT_APP_LIFF_ID: process.env.NEXT_APP_LIFF_ID,
    NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN:
      process.env.NEXT_APP_LIFF_CHANNEL_ACCESS_TOKEN,
    NEXT_APP_LIFF_CHANNEL_SECRET: process.env.NEXT_APP_LIFF_CHANNEL_SECRET,
  },
};
