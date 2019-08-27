const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const static = require('koa-static');
const {uploadFile} = require('./util/upload')

const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

const staticPath = './static';

app.use(static(
  path.join(__dirname, staticPath)
))

app.use( async(ctx) => {
  if(ctx.method === 'GET') {
    await ctx.render('index',{
      title: 'upload pic async'
    });
  }else if(ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
    let result = {success: false};
    let serverFilePath = path.join(__dirname, 'static/image');
    result = await uploadFile(ctx, {
      fileType: 'album',
      path: serverFilePath
    });
    ctx.body = result;
  }else{ 
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
  }
})

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
});