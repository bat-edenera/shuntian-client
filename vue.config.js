// vue.config.js
module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  outputDir: 'dist',
  devServer: {
    proxy: {
      "/": {
        target: 'http://192.168.0.118:8003',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       prependData: `@import "~@/assets/element-variables.scss";`
  //     }
  //   }
  // }
};
