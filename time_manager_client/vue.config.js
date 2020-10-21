const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0"
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
    resolve: {
      alias: {
        vue$: "vue/dist/vue.common.js",
        jquery: "jquery/src/jquery.js"
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
  }
};
