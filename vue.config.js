// vue.config.js
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("svg-url-loader")
      .loader("svg-url-loader")
      .end()
      .end()
      .oneOf("external")
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};
