const Koa = require('koa');
const session = require('koa-session-minimal');
const mySqlSession = require('koa-mysql-session');

const app = new Koa();

let store = new mySqlSession({
  user: 'root',
  password: '123456',
  database: 'koa_demo',
  host: '127.0.0.1',
});

let cookie = {
  maxAge: '',
  expires: '',
  domain: '',
  path: '',
  httpOnly: false,
}

app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie,
}))

app.use(async(ctx) => {
  if(ctx.url === '/set'){
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session;
  }else if(ctx.url === '/') {
    ctx.session.count++;
    ctx.body = ctx.session;
  }
})

app.listen(5000);
console.log('server is starting at port 5000! http://localhost:5000');