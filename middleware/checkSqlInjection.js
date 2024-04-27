// 定义一个中间件，用于校验参数是否存在 SQL 注入
async function checkSqlInjection(req, res, next) {
  // 获取请求参数
  const params = req.query || req.body;

  // 检查参数是否包含 SQL 注入风险
  for (const key in params) {
    const value = params[key];
    if (/['"\\;]/.test(value)) {
      // 如果存在 SQL 注入风险，返回错误响应
      res.status(400).send('参数存在 SQL 注入风险');
      return;
    }
  }

  // 如果没有发现 SQL 注入风险，继续处理请求
  await next();
}

module.exports = async function (app) {
  app.addHook('preHandler', checkSqlInjection);
};