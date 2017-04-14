const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const themeConfig = require('./src/theme')

const svgDirs = [
  require.resolve('antd').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/assets'),  // 2. 自己私人的 svg 存放目录
]

module.exports = {
  entry: [
    'webpack-hot-middleware/client',//当发生热更新时控制台会有提示,生成的bundle.js存储在内存中
    './src/index.js'//入口文件
  ],
  output: {
    filename: 'bundle.js',//打包后的文件名
    path: path.join(__dirname, 'dist'),//打包后的文件存储位置
    publicPath: '/dist'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.web.js', '.jsx', '.js', '.json']//引包按顺序查找此后缀文件(避免非RN开发时antd-mobile提示找不到react-native包)
  },

  devtool: 'cheap-module-eval-source-map',//开启生成source-map文件功能便于代码调试

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[local]-[hash:base64:5]',//编译css文件的loader并开启css-modules功能
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          `less-loader?{"modifyVars":${JSON.stringify(themeConfig)}}`//定制antd主题样式
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[local]-[hash:base64:5]',//编译less文件的loader并开启css-modules功能
          'postcss-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif|mp4|webm|woff|otf|webp)$/,
        use: 'url-loader'
      },
      {
        test: /\.(svg)$/i,
        use: 'svg-sprite-loader',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//代码热替换
    new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')//用于区分开发和生产环境
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer],//css样式及设备适配处理
        babel: { presets: ['react-hmre'] },//react热加载处理
        url: { limit: 10240 }
      }
    })
  ],
}