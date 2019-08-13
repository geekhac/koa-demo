const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa view'
  await ctx.render('index', {
    title,
  })
})

app.listen(5000);
console.log('server is starting at port 5000! http://localhost:5000');