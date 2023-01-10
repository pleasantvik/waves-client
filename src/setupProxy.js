const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/res.cloudinary.com"],
    createProxyMiddleware({
      target: "http://localhost:3001",
    })
  );
};
