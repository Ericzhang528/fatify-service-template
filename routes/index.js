const index = require("@_controller/index")
const routes = [
  {
    url: "/index",
    method: "GET",
    handler: index.index
  },
  {
    url: "/index",
    children: [
      {
        url: "/index",
        method: "GET",
        handler: index.index
      },
    ]
  }
]
const wsRoutes = [
  // {
  //   url: "",
  //   websocket: true,
  //   handler: handler
  // },

]
module.exports = {
  routes,
  wsRoutes
}
