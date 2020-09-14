const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');


const filePathFromComputer = './forwardlink.md';
const filePicPng = './examplddddde.png';

//Verificar si es un md

const checkMdPath = (file) => {
  const promise = new Promise ((resolve, reject) => {
    const doc = path.extname(file);
    if (doc === '.md') {
      resolve(true);
    }
    else{
      reject('Not supported file, .md files only');
    }
  });
  return promise;
}

//Ahora sí de verdad leer un archivo

const readFile = (filePath) => {
  const promise = new Promise ((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
        reject('Not valid file');
      }
      else{
        resolve(data);
      }
    });
  });
  return promise;
};

// Encontrar todos los links del archivo async

const findLinks = (file) => {
  const promise = new Promise ((resolve, reject) => {
    const fileContent = linkify.match(file);
    
    const urlArray = [];
    if(fileContent !== null){
      fileContent.forEach((e)  => {
        urlArray.push(e.url);
      });

      resolve(urlArray);

    }else{
      reject('No links detected');
    }
  });
  return promise;
}

// Para encontrar los links únicos (sync), código de internet

const stats = (urlsArray) => {
    var i,
    len = urlsArray.length,
    out = [],
    obj = {};

  for (i = 0; i < len; i++) {
  obj[urlsArray[i]] = 0;
  }
  for (i in obj) {
  out.push(i);
  }
  return out; // out.lenght
}


const lineAndNum = (link, file) => {
  const lineNumObj = [];
  const byLines = file.split(/\r?\n/);
  byLines.forEach((line, idx) => {
    const byWords = line.split(/( )|[()]/g);
    if (byWords.includes(link)) {
      const lineNum = idx + 1;
      const lineArr = line;
      const lineObj = { lineNum, lineArr };
      lineNumObj.push(lineObj);
    }
  });
  return lineNumObj;
};

//con axios (porque http.get no soporta promesas)

// axios.get('http://alefy.me/').then((res) =>{
//   console.log(res.status);
// }).catch(e => console.log(e.message));


const mdLinks = (filePath, options) => {

 
  return promise
}

// final de mdlinks2


mdLinks(filePathFromComputer, 'hackerEdition')






