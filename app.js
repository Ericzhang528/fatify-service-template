require('module-alias/register')

const fastify = require("fastify")({ logger:false });
const mysql = require("mysql2/promise");
const env = require('./process.env.js')

fastify.env = {...env}
const redis = require('@fastify/redis');
// 添加跨域支持
const cors = require('@fastify/cors')
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
})
// 创建连接池
const pool = mysql.createPool({
  host: fastify.env.ENV_DB_HOST, // 数据库地址
  user: fastify.env.ENV_DB_USER, // 数据库用户
  password: fastify.env.ENV_DB_PSW, // 数据库密码
  database: fastify.env.ENV_DB, // 选中数据库
  waitForConnections: true, // 当无连接池可用时，等待（true）还是抛错（false）
  connectionLimit: 10, // 连接数限制
  queueLimit: 0 // 最大连接等待数（0为不限制）
});
// 将连接池挂载到fastify实例上
fastify.decorate("mysql", pool);
// 连接redis
// 若启动失败可以将mysql和redis相关代码进行注释或修改env文件配置
fastify.register(redis, {
  host: fastify.env.ENV_REDIS_HOST,
  port: fastify.env.ENV_REDIS_PORT, // Redis port
  password: fastify.env.ENV_REDIS_PSW,
  family: 4
})
// console.log(fastify)
module.exports = fastify;
