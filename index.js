const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');



const arrFilepaths = [];

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
    }
    return(urlArray);
}

// Para encontrar los links únicos (sync)
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

//Para leer los .md dentro de directorios
const pathIsDirectory = (dirname) =>{
  const filenames = fs.readdirSync(dirname); 

    filenames.map((temp)=>{

    if(fs.lstatSync(path.join(dirname, temp)).isDirectory()){
      pathIsDirectory(path.join(dirname, temp));
    }else{
      if(path.extname(path.join(dirname, temp)) == '.md'){
        arrFilepaths.push(path.join(dirname, temp));
      }   
    }
  });
  //Me falta el caso en que no tenga md files
  return arrFilepaths;
}


const mdLinksDefault = (filePath, option = { validate: false } ) => {

  const promise = new Promise ((resolve, reject) =>{
    

    //aquí solo entra
    if(!(path.extname(filePath) === ".md")){ //preguntarrrrrrrrrrrrrr
      const newObj = {filePath, check: "No supported file"};
      reject(new Error('Not supported file')); //creo que debería ser rejected new err
    }

    readFile(filePath).then((data) =>{
      var objReturn;
      const byLines = data.split(/\r?\n/);

      const linkInfoPromises = [];

      // if(!(Array.isArray(findLinks(data)) && findLinks(data).length)){ //Pregguntar
      //   const newObj = {filePath, check: "No links detected in this file"};
      //   resolve(newObj);
      // } //si queda vacío entonces no debería decir que ese archivo no tiene links?

      findLinks(data).forEach((link)=>{
        byLines.forEach((line, idx) => {
          if(line.includes(link)){
            linkInfoPromises.push(getAxiosPromise(line, idx, link, filePath, option));
          }
        });        
      });

      objReturn = Promise.all(linkInfoPromises);

      resolve(objReturn);

    }).catch((err) =>{
      reject(err);
    });
  });

  return promise;
}

const getAxiosPromise = (line, idx, link, filePath, option) =>{

  const promise = new Promise((resolve) => {
    const text = line.split('[').pop().split(']')[0];
    const newObj = {link, line: idx+1, text, file: filePath } //Más uno porque la linea empeiza en cero por el array

    if(!option.validate){
      resolve(newObj);
      return;
    } 

    axios.get(link).then((res) =>{
                const status = res.status;
                const ok = 'ok';
                newObj.status = status;
                newObj.check = ok;

                resolve(newObj);

              }, (err) => {
                if(err.response != undefined){
                  const status = err.response.status;
                  newObj.status = status;
                }
                const ok = 'broken'; 
                newObj.check = ok;
                resolve(newObj);
            });
  });
  return promise;
}

// const mdLinks = (filename, option = {validate: false}) =>{

//     filename = path.resolve(filename);
   
    
//     if(fs.lstatSync(filename).isFile()){
//       return mdLinksDefault(filename, option);
//     }
//     else if(fs.lstatSync(filename).isDirectory() ){
      
//       const mdLinksDirectory = pathIsDirectory(filename);
//       const mdLinksDirectoryPromises = mdLinksDirectory.map((mdfilepath) =>{      
//         return mdLinksDefault(mdfilepath, option)
//       });

//       return Promise.all(mdLinksDirectoryPromises);

//     }else{
//       return "is this real life"
//     }
//   }


//   const getName = () => {
//     return 'Alefy'
//   }
  
  
  module.exports = mdlinks = (filename, option = {validate: false}) => {

    //Meter todo esto dentro de otra promsea jesús y resolver dos cosas: 1. wrong path y no md files inside para que no quede vaciío y flat() promiseall
    filename = path.resolve(filename);
   
    if(fs.lstatSync(filename).isFile()){
      return mdLinksDefault(filename, option);
    }
    else if(fs.lstatSync(filename).isDirectory() ){
      
      const mdLinksDirectory = pathIsDirectory(filename);

            // if(!(Array.isArray(mdLinksDirectory) && mdLinksDirectory.length)){ //Pregguntar
      //   const newObj = {filePath, check: "No .md files in this folder"};
      //   resolve(newObj);
      // } //si queda vacío entonces no debería decir que ese archivo no tiene md files en el interior?

      const mdLinksDirectoryPromises = mdLinksDirectory.map((mdfilepath) =>{      
        return mdLinksDefault(mdfilepath, option)
      });

      return Promise.all(mdLinksDirectoryPromises);

    }else{
      return "is this real life"
    }
  }




