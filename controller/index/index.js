const index = function (req, rep) {
  rep.send("Hello World!")
}
module.exports = {
  index
}