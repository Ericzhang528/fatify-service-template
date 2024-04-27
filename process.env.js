const args = process.argv.slice(2); // 去掉前两个元素，只保留参数部分
const fs = require('fs')
let obj = {}
for(let i =0;i<args.length;i++) {
  let arg = args[i].replace(/^--/, '');
  let argArr = arg.split('=')
  if (argArr[0]) {
    obj[argArr[0]]=argArr[argArr.length - 1]
  }
}
let data = []
if(!obj.ENV) {
  data = fs.readFileSync('./.env.develop', 'utf8').split('\r\n')
} else {
  data = fs.readFileSync(`./.env.${obj.ENV}`, 'utf8').split('\r\n')
}
for(let i =0;i<data.length;i++) {
  let arg = data[i]
  let argArr = arg.split('=')
  if (argArr[0]) {
    obj[argArr[0]]=argArr[argArr.length - 1]
  }
}

const figlet = require('figlet');

function generateAsciiArt(text, callback) {
  figlet(text, (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    callback(data);
  });
}

// 示例用法
generateAsciiArt('FASTIFY-SERVICE-TEMPLATE', (asciiArt) => {
  console.log(asciiArt);
});

module.exports = obj