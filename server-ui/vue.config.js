const path = require('path');
const config = require('./config');

module.exports = {
    publicPath: '/',
    outputDir: './dist/blog',
    productionSourceMap: false,
    configureWebpack: _config => {
        return {
            resolve: {
                alias: {
                    '@jws': path.resolve(__dirname, './jws_modules'),
                    '@config': path.resolve(__dirname, './config')
                }
            }
        }
    },
    chainWebpack: _config => {
        _config.plugin('html').tap(args => {
            args[0].title = 'lifeHelper'
            return args
        });
    },
    devServer: {
        disableHostCheck: true,
        proxy: config.devServerProxy
    }
};
