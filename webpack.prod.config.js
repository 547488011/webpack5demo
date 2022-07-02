const { merge } = require('webpack-merge')
const base = require('./webpack.config');

const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack');

module.exports = merge(base,{
        optimization: {
            minimizer: [
            //压缩CSS代码
                new OptimizeCss(),
            //压缩js代码
                new UglifyJsPlugin({
                //启用文件缓存
                    cache: true,
                //使用多线程并行运行提高构建速度
                    parallel: true,
                    sourceMap: true
                })
            ]
        },
      plugins:[
        //使用插件定义全局变量DEV
           new webpack.DefinePlugin({
               DEV:JSON.stringify('production')
           }),
           new CompressionPlugin({
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
          })
       ]
})
