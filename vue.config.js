module.exports = {
  devServer: {
    // HMR(Hot-Module-Replacement)을 위한 웹소켓 연결 문제를 해결하기 위해 client 옵션을 추가합니다.
    // 'auto'로 설정하면 브라우저의 window.location을 기반으로 웹소켓 URL을 자동으로 설정하여
    // localhost, 127.0.0.1, 또는 네트워크 IP 등 어떤 주소로 접속하더라도 HMR이 정상 동작하도록 합니다.
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
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
