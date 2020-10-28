const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0"
  },
  configureWebpack: {
    plugins:
      process.env.npm_lifecycle_event !== "build"
        ? [new BundleAnalyzerPlugin()]
        : []
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
  }
};
