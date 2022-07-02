const path = require('path')
// vue-loader@next版本后需要引入这个插件
const {
    VueLoaderPlugin
} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自动按需导入element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
    ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle_[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.vue', '.js', '.ts', '.tsx']
    },
    mode: 'development',
    // 添加模块
    module: {
        rules: [{
            test: /\.tsx$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'ts-loader']
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset/resource'
        },
        {
            test: /\.svg$/,
            type: 'asset/inline',
        },
        {
            test: /\.module\.less/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: true,
                        localIdentName: '[local]_[hash:base64:5]'
                    }
                }
            },
            {
                loader: 'less-loader',
            }


            ]
        },
        {
            test: /\.less$/,
            exclude: [/\.module\.(css|less)/, /\.global\.less$/],
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'less-loader'
            }

            ]
        },
        {
            test: /\.ts$/,
            exclude: '/node_modules',
            use: [{
                loader: 'ts-loader',
            }],
        }
        ]
    },
    devtool: 'source-map',
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', //配置输出后的html文件名
            template: './public/index.html' //配置模版
        })
    ],
    // 配置webpack-dev-server将dist下的目录代理到web server
    devServer: {
        static: './dist',
        hot: true,
        open: true, // 编译结束后自动打开浏览器
        // 设置本地端口号
        host: "localhost" //设置本地url
    }
}