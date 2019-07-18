const Koa = require('koa');
const logger = require('./logger');

const app = new Koa();
app.use(logger());

app.use(function *() {
  this.body = 'hello world';
})

app.listen(5000);
console.log('server is starting at port 5000! http://localhost:5000');