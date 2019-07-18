const Koa =  require('koa');

const app = new Koa();

app.use(async(ctx) => {
  const url = ctx.url;
  const request = ctx.request;
  const reqQuery = request.query;
  const reqQueryStr = request.querystring;
  const ctxQuery = ctx.query;
  const ctxQueryStr = ctx.querystring;
  ctx.body = {url, reqQuery, reqQueryStr, ctxQuery, ctxQueryStr};
})

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
});