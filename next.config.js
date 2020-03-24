const path = require('path')
const withStylus = require('@zeit/next-stylus')


let config = {
    webpack: config => {
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        return config
    }
}

config = withStylus({
    ...config,
    cssModules: true
})


module.exports = config
