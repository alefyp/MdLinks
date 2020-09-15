const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');

const filePathFromComputer = './forwardlink.md';

const mdlinks = (filePath) => {

  const verifyMdPath = new Promise ((resolve, reject) => {
    const doc = path.extname(filePath);
    if (doc === '.md') {
      resolve(true);
    }
    else{
      reject('Not supported file, .md files only');
    }
  });

  //read file and convert to utf8 text
  const readFilePromise = new Promise ((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
        reject('Not valid file');
      }
      else{
        resolve(data);
      }
    });
  });

  //Encontrar los links
  const findLinks = new Promise ((resolve, reject) => {

    readFilePromise.then((res) => {

      const fileLinks = linkify.match(res);
      const urlArray = [];

      if(fileLinks !== null){
        fileLinks.forEach((link)  => {
        urlArray.push(link.url);            
        });

        resolve(urlArray);
        
      } //Cierra if

      else{
        reject('No links detected');
      }

    }).catch(e => console.log(e)); //aqui termina linkify con catch

  });

  //Agregar la promesa - folder o archivo individual 
  return Promise.all([verifyMdPath, findLinks]);
}

mdlinks(filePathFromComputer).then((result) => {
  console.log(result)
})
.catch(error => console.log(`Error in promises ${error}`));

//console.log(mdlinks(filePathFromComputer));

