const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');

const filePathFromComputer = './forwardlink.md';
const arrayDeFilePaths = [];

//Esto finalmente es una bobada, se arregla
const pathAbsolute = (filePath) => {
  if(path.isAbsolute(filePath)){
    return filePath
  }else{
    const filePathAbsolute = path.resolve(filePath);
    return filePathAbsolute
  }
}

const readDirectories = (dirname) => {
  const filenames = fs.readdirSync(dirname); 

  filenames.map((abc)=>{

    if(fs.lstatSync(path.join(dirname, abc)).isDirectory()){
      intento(path.join(dirname, abc));
    }else{
      if(path.extname(path.join(dirname, abc)) == '.md'){
        arrayDeFilePaths.push(path.join(dirname, abc));}   
    }
  });

  return arrayDeFilePaths;
}

const readFile = (filePath) => {
  const promise = new Promise ((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
        reject('Not valid file'); //verificar
      }
      else{
        resolve(data);
      }
    });
  });
  return promise;
};

const findLinks = (file) => {
  const fileContent = linkify.match(file); 
  const urlArray = [];
  if(fileContent !== null){
    fileContent.forEach((e)  => {
      urlArray.push(e.url);
    });
  return(urlArray);
  }else{
    return('No links detected');
  }
}



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

const findRefText = () => {
  //más adelante xd
}




const mdLinks = (filePath, option = { validate: false } ) =>{
  const promise = new Promise ((resolve, reject) => {

    readFile(filePath).then((data) =>{
      
      const objReturn = [];
      const byLines = data.split(/\r?\n/);


      const linkExample = findLinks(data).map((link) =>{
        byLines.forEach((line) =>{
          if(line.includes(link))
        })
      })
      
      
      findLinks(data).forEach((link) =>{

        byLines.forEach((line) => {
          if(line.includes(link)){
            const text = line.split('[').pop().split(']')[0];
            const newObj = {link, text, file: filePath }
            objReturn.push(newObj);
          }  
        });  
      });
      resolve(objReturn);
    }).catch((err) => {
      reject(err);
    });
  })

  return promise;
}


// console.log(mdLinks(filePathFromComputer));
mdLinks(filePathFromComputer, { validate: false }).then((res) => {
  console.log(res)}).catch((e) => {console.log(e)});

  //aprendiendo a usar map
  

