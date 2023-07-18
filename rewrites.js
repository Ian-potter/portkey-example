/** @type {import('next').NextConfig.rewrites} */

module.exports = [
    { source: '/api/:path*', destination: 'https://did-portkey-test.portkey.finance/api/:path*' },
    {
        source: '/graphql/:path*',
        destination: 'https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/:path*'
    }
];
