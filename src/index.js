const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');
const _ = require('lodash'); //no one will ever know the things i've done xD

linkify
  .add('git:', 'http:')           // Add `git:` protocol as "alias"
  .add('ftp:', null)              // Disable `ftp:` protocol
  .set({ fuzzyIP: true, fuzzyLink: true });        // Enable IPs in fuzzy links (without schema)

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


//entra un archivo en texto platno utf-8
const findLinks = (file) => {
    const fileContent = linkify.match(file); 
    const urlArray = [];
    
    if(fileContent !== null){
      fileContent.forEach((e)  => {
        urlArray.push({url: e.url, raw: e.raw});
      }); 
    }
    return(urlArray);
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
      const tempArr = [];

      const completeLinksArr = findLinks(data);

      if(!(Array.isArray(completeLinksArr) && completeLinksArr.length)){
        const newObj = {filePath, check: "No links detected in this file"}; //documentarlo
        linkInfoPromises.push(newObj);
        //return newObj;
      } else {
        byLines.forEach((line, idx)=>{
          
          completeLinksArr.forEach((link) => {
            
            if(line.includes(link.raw)){
              tempArr.push({line, idx, link: link.url, filePath, option});
              
              //linkInfoPromises.push(getAxiosPromise(line, idx, link.url, filePath, option));
            }
          });
          
          
        });
        
      }

      const unique = _.uniqBy(tempArr, 'line' && 'link' && 'idx'); //secrets xD

      unique.forEach((obj) =>{
        linkInfoPromises.push(getAxiosPromise(obj.line, obj.idx, obj.link, obj.filePath, option));
      })

      return linkInfoPromises;
    }).catch((err) =>{
      return Promise.reject(err); //err read file
  });
}

const getAxiosPromise = (line, idx, link, filePath, option) =>{ //creación objeto

    const text = line.split('[').pop().split(']')[0]; //text
    const newObj = {link: link, line: idx+1, text, file: filePath } //Más uno porque la linea empeiza en cero por el array
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
                } //could be this but it works in checkjs and clijs 
                const ok = 'broken'; 
                newObj.check = ok;
                return(newObj);
            }).catch();
}

  module.exports = mdlinks = (filename, option = {validate: false}) => {

    const promiseLaUltimaLoJuro = new Promise((resolve, reject) => {
      filename = path.resolve(filename);
      
      
      fs.open(filename, 'r', (err, fd) => {
        if (err) {
          if (err.code === 'ENOENT') {
            //console.error('File does not exist');
          }
          reject(new Error(err.message))
        }else{
          if(fs.lstatSync(filename).isFile()){
            resolve(mdLinksDefault(filename, option).then((e) => Promise.all(e)));
          }
          else if(fs.lstatSync(filename).isDirectory() ){
            
            const mdLinksDirectory = pathIsDirectory(filename);
    
            const mdLinksDirectoryPromises = mdLinksDirectory.map((mdfilepath) =>{      
              return mdLinksDefault(mdfilepath, option)
            });
            const newPromises = mdLinksDirectoryPromises.flat();
            
            resolve(Promise.all(newPromises).then((e) => Promise.all(e.flat())));
          }
    
        }
      });
    })   
    
    return promiseLaUltimaLoJuro;
  }