const Koa =  require('koa');

const app = new Koa();

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
    const body = await parsePostData(ctx);
    ctx.body = body;
  }
})

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    let queryStr = '';
    try{
      ctx.req.addListener('data', (data) => {
        queryStr += data;
      })
      ctx.req.addListener('end', (data) => {
        const postData = parseQueryStr(queryStr);
        resolve(postData)
      })
    }catch(err){
      reject(err);
    }
  })
}

function parseQueryStr( queryStr ) {
  const queryArr = queryStr.split('&');
  const queryData = {};

  for(let [index, queryItem] of queryArr.entries()){
    const itemList = queryItem.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }

  return queryData;
}

app.listen(5000, () => {
  console.log('server is starting at port 5000! http://localhost:5000')
})