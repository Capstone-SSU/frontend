const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			// target: 'http://moyeo.org', 
			target: 'http://localhost:8080', 
			changeOrigin: true,
		})
	);
};