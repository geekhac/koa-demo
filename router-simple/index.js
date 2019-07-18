const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  const url = ctx.request.url;
  ctx.body = url;
})

app.listen(5000);
console.log('server is starting at port 5000! http://localhost:5000');