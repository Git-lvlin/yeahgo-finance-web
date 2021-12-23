/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/open/': {
      target: 'http://financeapi-dev.yeahgo.com',
      changeOrigin: true,
      pathRewrite: {
        '^': ''
      }
    },
    '/auth/': {
      target: 'http://financeapi-dev.yeahgo.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      }
    },
    '/fmis/': {
      target: 'http://192.168.14.202:50036/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    }
  },
};
