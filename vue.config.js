const url = process.env.NODE_ENV === 'production' ? '.' : '/';
module.exports = {
    baseUrl: url, // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    parallel:  require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    css: {
        modules: false, // 是否开启支持‘foo.module.css’样式
        extract: false, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        sourceMap: false, // 是否在构建样式地图，false将提高构建速度
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                // data: `@import "@/sass/common.scss";`
            },
            postcss: {
                autoprefixer: {},
                ident: 'postcss',
                plugins: [
                    require('postcss-px2rem')({remUnit: 37.5})
                ]
            }
        }
    },
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: null, // string | Object
    }
};