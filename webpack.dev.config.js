const { merge } = require('webpack-merge')
const base = require('./webpack.config');
const webpack = require('webpack')

module.exports = merge(base,{
    // 模块参数
    mode: 'development',
    devServer: {
        static: './dist',
        hot: true,
        open: true, // 编译结束后自动打开浏览器
        // 设置本地端口号
        host: "localhost", //设置本地url
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    },
    devtool: 'source-map',
    plugins: [
        //定义全局变量
         new webpack.DefinePlugin({
          //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
             DEV: JSON.stringify('dev')
         })
     ]
})