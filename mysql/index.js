const fs =  require('fs');
const path = require('path');
const yaml = require('js-yaml');
const target = {};

function getTargetData() {
  return Promise.all(['en', 'zh'].map((lan,index) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname,  `./target/${lan}.json`),'utf8',(err, data) => {
        if(err) {
          return;
        }
        target[lan] = JSON.parse(data);
        resolve(data);
      })
    })
  })).then(() => {
    return target;
  })
}

function getSourceFiles() {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, './source/zh'), 'utf-8', (err,files) => {
      if(err){
        reject();
      }
      resolve(files);
    })
  })
}

function getSourceData() {
  return getSourceFiles().then((files) => {
    const keyFileList = {};
    const normalFileList = {}
    return Promise.all(
      files.map((file, index) => {
        if(file.includes('key.yaml')){
          keyFileList[file] = {};
          return Promise.all((['en', 'zh'].map((lan, index) => {
            return new Promise((resolve, reject) => {
              return fs.readFile(path.join(__dirname,`./source/${lan}/${file}`), 'utf8', (err,data) => {
                if(err){
                  reject();
                }
                keyFileList[file][lan] = yaml.safeLoad(data);
                resolve();
              });
            })
          })))
        }else{
          return new Promise((resolve, reject) => {
            return fs.readFile(path.join(__dirname,`./source/zh/${file}`), 'utf8', (err,data) => {
              if(err){
                reject();
              }
              normalFileList[file] = yaml.safeLoad(data);
              resolve();
            });
          })
        }
      })
    ).then((data) => {
      return {keyFileList, normalFileList}
    })
  })
}

function translate(sourceData, targetData) {
  const formatTargetZh = changeKeyValue(targetData.zh);
  const translateNormal = getTranslateNormal(sourceData.normalFileList,{en:targetData.en, zh:formatTargetZh });
  const translateKey = getTranslateKey(sourceData.keyFileList,{en: translateNormal,zh: formatTargetZh})
  return translateKey;
}
function getTranslateNormal(normalFileList, formatTarget) {
  const targetEn = formatTarget.en;
  Object.values(normalFileList).forEach((fileData) => {
    Object.entries(fileData).forEach((data) => {
      const key = formatTarget.zh[data[1]]
      if(key){
        targetEn[key] = data[0]
      }
    })
  })
  return targetEn;
}
function getTranslateKey(keyFileList, formatTarget) {
  const targetEn = formatTarget.en;
  Object.values(keyFileList).forEach((keyFiles) => {
    Object.entries(keyFiles.zh).forEach((zhData) => {
      if(formatTarget.zh[zhData[1]]){
        const key = zhData[0]
        const en = keyFiles.en[key];
        targetEn[formatTarget.zh[zhData[1]]] = en;
      }
    })
  })
  return targetEn;
}


function changeKeyValue(object) {
  const result = {};
  for(let key in object) {
    result[object[key]] = key;
  }
  return result;
}

const getNewData = async function() {
  const targetData = await getTargetData();
  const sourceData = await getSourceData();
  const translateData = translate(sourceData, targetData);
  fs.writeFile(path.join(__dirname,'./target/en.json'), JSON.stringify(translateData), 'utf8',(err) => {
    if (err) throw err;
    console.log('文件已被保存');
  });
}

getNewData();