const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// 子路由1
const home = new Router();
home.get('/', async(ctx) => {
  ctx.body = `
    <ul>
      <li><a href="/page/hello-world">/page/hello-world</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
})

// 子路由2
const page = new Router();
page.get('/hello-world', async(ctx) => {
  ctx.body = 'hello world!';
}).get('/404', async(ctx) => {
  ctx.body = '404 page!';
})

// 装在所有路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
});