const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'hello world';
})

app.listen(5000);
console.log('server is starting at port 5000! http://localhost:5000')