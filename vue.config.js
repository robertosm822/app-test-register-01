const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 21128,
    host: 'soaresinformatica.dev.br',
    https: false,
  }
})
