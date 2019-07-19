const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async(ctx) => {
  if(ctx.url === '/' && ctx.method === 'GET'){
    ctx.body = `
      <h1>Koa request post demo</h1>
      <form method="POST" action="/">
        <p>username</p>
        <input name="userName"></br>
        <p>email</p>
        <input name="email"></br>
        <button type="submit">submit</button>
      </form>
    `
  }else if(ctx.url === '/' && ctx.method === 'POST'){
    ctx.body = ctx.request.body;
  }else{
    ctx.body = '<h1>404 Not Found !</h1>'
  }
})

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
})
