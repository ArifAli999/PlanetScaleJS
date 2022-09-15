/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@ably-labs/react-hooks']);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withTM({
  reactStrictMode: false,
  swcMinify: true,
})