const path = require('path');
const fs = require('fs');

// 获取静态资源内容
async function content(ctx, fullStaticPath){
  let reqPath = path.join(fullStaticPath, ctx.url);

  let exist = fs.existsSync(reqPath);

  if(!exist){
    return '404 Not Found!'
  }else{
    let stat = fs.statSync(reqPath);
    if(stat.isDirectory()){
      // 遍历当前目录的子目录
      const contentList = fs.readdirSync(reqPath)
      let html = `<ul>`;
      for( let[index, content] of contentList.entries()){
        html += `<li><a href="${ctx.url === '/' ? '' : ctx.url}/${content}">${content}</a></li>`
      }
      html += `</ul>`
      return html;
    }else{
      return await fs.readFileSync(reqPath, 'binary');
    }
  }
}

module.exports = content;