const path = require('path')
const withStylus = require('@zeit/next-stylus')


let config = {
    webpack: config => {
        config.resolve.modules.push(path.join(__dirname))
        return config
    },
    webpack5: false
}

config = withStylus({
    ...config,
    cssModules: true
})


module.exports = config
