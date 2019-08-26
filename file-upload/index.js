const Koa =  require('koa');
const path  =  require('path');
const app  = new Koa();

const { uploadFile } = require('./util/upload');

app.use(async (ctx) => {
  if(ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
      <span>picture name:</span><input name="picName" type="text"/><br/>
      <input type="file" name="file"/><br/>
      <button type="submit">submit</button>
      </form>
    `
    ctx.body = html;
  }else if(ctx.url === '/upload.json' && ctx.method === 'POST') {
    let result = {success: false};
    let serverFilePath = path.join(__dirname, 'upload-files')
    result =  await uploadFile(ctx, {
      fileType: 'album',
      path: serverFilePath
    })
    ctx.body = result;
  }else{
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
  }
})

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
});