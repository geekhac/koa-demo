const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
  if(ctx.url === '/index'){
    ctx.cookies.set(
      'cid',
      '12313',
      {
        domain: 'localhost',
        path: '/index',
        maxAge: 3 * 60 * 1000,
        httpOnly: false,
        overwrite: false,
      }
    )
    ctx.body = 'cookie is ok';
  }else{
    ctx.body = 'hello world';
  }
})

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
})