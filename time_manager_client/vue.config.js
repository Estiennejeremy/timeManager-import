const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0"
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
  }
};
