module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://gncsdev.inconus.kr', // API 서버 주소로 변경
        changeOrigin: true,        
      },
    },
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
}
