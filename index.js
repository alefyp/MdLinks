const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');
const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require('constants');



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

    if(!(path.extname(filePath) === ".md")){ 
      return Promise.reject(new Error('Not supported file, markdown files only')); 
    }

    return readFile(filePath).then((data) =>{
      var objReturn;
      const byLines = data.split(/\r?\n/);

      const linkInfoPromises = []; //links promises

      if(!(Array.isArray(findLinks(data)) && findLinks(data).length)){
        const newObj = {filePath, check: "No links detected in this file"}; //documentarlo
        linkInfoPromises.push(newObj);
        //return newObj;
      } else{
        findLinks(data).forEach((link)=>{
          byLines.forEach((line, idx) => {
            if(line.includes(link)){
              linkInfoPromises.push(getAxiosPromise(line, idx, link, filePath, option));
            }
          });        
        });
      }
      return linkInfoPromises;
    }).catch((err) =>{
      return Promise.reject(err); //err read file
  });
}

const getAxiosPromise = (line, idx, link, filePath, option) =>{

    const text = line.split('[').pop().split(']')[0];
    const newObj = {link, line: idx+1, text, file: filePath } //Más uno porque la linea empeiza en cero por el array

    if(!option.validate){
      return Promise.resolve(newObj);
    } 

    //se pueden hacer .then infinitos haciendo return cosito 
    return axios.get(link).then((res) =>{
                const status = res.status;
                const ok = 'ok';
                newObj.status = status;
                newObj.check = ok;

                return(newObj);

              }, (err) => {
                if(err.response != undefined){
                  const status = err.response.status;
                  newObj.status = status;
                }
                const ok = 'broken'; 
                newObj.check = ok;
                return(newObj);
            });
}

  module.exports = mdlinks = (filename, option = {validate: false}) => {

    //fs access ==> else de no valid file
    filename = path.resolve(filename);
   
    if(fs.lstatSync(filename).isFile()){
      return mdLinksDefault(filename, option);
    }
    else if(fs.lstatSync(filename).isDirectory() ){
      
      const mdLinksDirectory = pathIsDirectory(filename);
      console.log("Va a ser un array de archivos:", mdLinksDirectory)

      const mdLinksDirectoryPromises = mdLinksDirectory.map((mdfilepath) =>{      
        return mdLinksDefault(mdfilepath, option)
      });
      const newPromises = mdLinksDirectoryPromises.flat();

      //console.log("Array de promesas: ", mdLinksDirectoryPromises);
      
      return Promise.all(newPromises).then((e) => Promise.all(e.flat()));
        

    }
  }




