const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('process.env.REACT_APP_DEV_CODE_PUSH_PROXY', process.env.REACT_APP_DEV_CODE_PUSH_PROXY);

module.exports = function(app) {
    app.use(
        '/api/portal/',
        createProxyMiddleware({
            target: process.env.REACT_APP_DEV_CODE_PUSH_PROXY,
            changeOrigin: true,
            logLevel: 'debug',
            onProxyReq: function onProxyReq(proxyReq, req, res) {
                // Log outbound request to remote target
                console.log('-->  ', req.method, req.path, '->', proxyReq.baseUrl + proxyReq.path);
            },
            onError: function onError(err, req, res) {
                console.error(err);
                res.status(500);
                res.json({error: 'Error when connecting to remote server.'});
            },
        })
    );
};
