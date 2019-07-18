const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

function render(page) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./view/${page}`, "binary", (err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  })
}

async function route(url){
  let page;
  switch(url){
    case '/':
    case '/index':
      page = 'index.html';
      break;
    case '/todo':
      page = 'todo.html';
      break;
    default:
      page = '404.html';
  }
  const html = await render(page);
  return html;
}

app.use(async(ctx) => {
  ctx.body = await route(ctx.url);
})

app.listen(5000);
console.log('server is starting at port 5000! http://localhost:5000')

