const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');


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
    return(urlArray);
    }else{
      return('No links detected');
    }
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

//hacker edition buscar la linea 
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



// axios.get('http://alefy.me/').then((res) =>{
//   console.log(res.status); // 404
// }).catch(e => console.log(e.message));


const mdLinks = (filePath, options) => {
  
  readFile(filePath).then((data) => {
    const urlArray = findLinks(data);

    urlArray.forEach((link) =>{

      axios.get(link).then((ax) => {
        if(ax.status ==200){
          console.log(link, 'ok', ax.status);
        }else{
          console.log(link, 'broken');
        }
        
      }, (e) => {console.log(link, 'broken')});

      

    })

  });
  
}

const mdLinksDefault = (filePath, option = { validate: false } ) => {


  console.log(option);
  const promise = new Promise ((resolve, reject) =>{
    
    readFile(filePath).then((data) =>{
      const objReturn = [];
      const byLines = data.split(/\r?\n/);
      findLinks(data).forEach((link)=>{
        
        byLines.forEach((line) => {
          if(line.includes(link)){

            //aquí va el axios 

            //si la option es validate true, etnonces ahí si va a axios 
            if(option.validate){      
              console.log(axios.get(link)); //promesa
              axios.get(link).then((res) =>{
                const status = res.status;
                const ok = 'ok';
                const text = line.split('[').pop().split(']')[0];
                const newObj = {link, text, ok, status, file: filePath }
                objReturn.push(newObj);
              }, (err) => {
                const statusErr = err.response.status;
                const broken = 'broken';
                const text = line.split('[').pop().split(']')[0];
                const newObj = {link, text, broken, status: statusErr, file: filePath }
                objReturn.push(newObj);

              })
            }
            // const text = line.split('[').pop().split(']')[0];
            // const newObj = {link, text, file: filePath }
            // objReturn.push(newObj);
          }
        })        
      });    
      resolve(objReturn);
    }).catch((err) =>{
      reject(err);
    });
  });

  return promise;
}


mdLinksDefault(filePathFromComputer, { validate: true }).then((res) => {
  console.log(res)}).catch((e) => {console.log(e)})












