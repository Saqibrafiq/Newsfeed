module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? ''
        : '/',
    assetsDir: 'assets',
    productionSourceMap: false,
    filenameHashing: true,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/main.scss";`
            }
        }
    }
};