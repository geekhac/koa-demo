const Koa = require('koa');
const path = require('path');
const content = require('./util/content');
const mimes = require('./util/mimes');

const app = new Koa();
const staticPath = './static';

function parseMime (url) {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : '';
  return mimes[extName];
}

app.use(async (ctx) => {
  const fullStaticPath = path.join(__dirname, staticPath);
  const _content = await content(ctx, fullStaticPath);

  const _mime = parseMime(ctx.url);
  if(_mime){
    ctx.type = _mime;
  }

  // 如果是图片，需要甩node 原生的res，输出二进制数据
  if(_mime && _mime.includes('image/')){
    ctx.res.writeHead(200);
    ctx.res.write(_content, 'binary');
    ctx.res.end();
  }else{
    ctx.body = _content;
  }
})

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
})
