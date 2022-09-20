/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    moralisApiKey: process.env.MORALIS_API_KEY,
    moralisAppId: process.env.MORALIS_APP_ID,
    modalisServerUrl: process.env.MORALIS_SERVER_URL,
    dustb0xApiUri: process.env.DUSTB0X_API_URI,
    dustb0xContractAddress: process.env.DUSTB0X_CONTRACT_ADDRESS,
    dustb0xOwnerAddress: process.env.DUSTB0X_OWNER_ADDRESS
  },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.ignoreWarnings = [
      {
        message:
          /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
      },
    ];
    return config;
  },
}

module.exports = nextConfig
