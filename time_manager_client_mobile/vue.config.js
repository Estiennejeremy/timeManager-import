module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    host: "0.0.0.0"
  },

  chainWebpack(config) {
    config.plugins.delete("prefetch");
  },

  publicPath: "",

  pluginOptions: {
    cordovaPath: "src-cordova"
  }
};
