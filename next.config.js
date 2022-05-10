/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
    reactStrictMode: true,
    experimental: {
        runtime: 'nodejs',
        serverComponents: true,
    },
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'src/styles'),
            path.join(__dirname, 'public/fonts')
        ],
    },
}
