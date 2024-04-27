// 引入fastify和routes配置
const fastify = require("./app");
// 引入路由配置
const { routes, wsRoutes } = require("./routes");

// 注册路由
function registerRoutes(routes, prefix = "") {
  routes.forEach((route) => {
    if (route.children) {
      const path = prefix + route.url;
      registerRoutes(route.children, path);
    } else {
      fastify.route({
        ...route,
        url: prefix + route.url
      })
    }
  });
}
registerRoutes(routes);
function registerWs(routes) {
  fastify.register(async function (fastify) {
    for (let k =0;k<routes.length;k++) {
      fastify.get(wsRoutes[k].url, { websocket: true }, wsRoutes[k].handler)
    }
  })
}
const websocket = require('@fastify/websocket');
// 注册websocket
fastify.register(websocket, {
  cors: true
})


registerWs(wsRoutes)

// 启动服务器
const start =  () => {
  fastify.listen({ port: fastify.env.ENV_PORT, host: fastify.env.ENV_HOST }, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.info(`server listening on http://${fastify.env.ENV_HOST}:${fastify.env.ENV_PORT}`)
  });
};

start();

