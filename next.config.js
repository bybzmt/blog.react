const withLess = require('@zeit/next-less')

module.exports = withLess({
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {

    config.resolve.alias["~"] = __dirname

    return config
  },

  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
})
