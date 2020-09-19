const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');
const { Console } = require('console');

const filePathFromComputer = './forwardlink.md';
const filePicPng = './examplddddde.png';


//recibe solamente la string == esto va a sync
const checkMdPath = (file) =>  path.extname(file) === ".md";  

//Ahora sí de verdad leer un archivo

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

// Encontrar todos los links del archivo async

//Aquí recibe data en utf8 //sync la data ya está disponible 
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

// Para encontrar los links únicos (sync), código de internet //Set (tipo de dato)
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



const mdLinksDefault = (filePath, option = { validate: false } ) => {



  const promise = new Promise ((resolve, reject) =>{
    
    readFile(filePath).then((data) =>{
      var objReturn;
      const byLines = data.split(/\r?\n/);

      const linkInfoPromises = [];

      if(!(Array.isArray(findLinks(data)) && findLinks(data).length)){
        const newObj = {filePath, check: "No links detected in this file"};
        resolve(newObj);
      }

      findLinks(data).forEach((link)=>{
        
        byLines.forEach((line, idx) => {

          if(line.includes(link)){
            linkInfoPromises.push(getAxiosPromise(line, idx, link, filePath, option));
          }

        })        
      });

      objReturn = Promise.all(linkInfoPromises);

      resolve(objReturn);

    }).catch((err) =>{
      reject(err);
    });
  });

  return promise;
}

function getAxiosPromise(line, idx, link, filePath, option){

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
                //console.log(err.response.status)
                const status = err.response.status;
                const ok = 'broken';
                newObj.status = status;
                newObj.check = ok;

                resolve(newObj);

            });

  });

  return promise;

}


mdLinksDefault(filePathFromComputer, { validate: true }).then((res) => {
  console.log(res)}).catch((e) => {console.log(e)})

  console.log("Hola a todos yo debo salir primero porque espero a que lo de mdlinks se haga porque dura una eternidad wtf")




