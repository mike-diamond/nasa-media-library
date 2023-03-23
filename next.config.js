const path = require('path')


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
      },
    ],
  },
  sassOptions: {
    additionalData: `
      @use 'sass:math';
      @import '~src/scss/index.scss';
    `,
    includePaths: [
      path.join(__dirname, 'src/scss'),
    ],
  },
}
