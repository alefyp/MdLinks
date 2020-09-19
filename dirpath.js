const fs = require('fs');
const path = require('path');
const myPath = '../TestFolder';

const absoluteFilePath = path.resolve(myPath);

const arrayDeFilePaths = [];

const intento = (dirname) => {
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

const arrayFinal = intento(absoluteFilePath);
console.log(arrayFinal);



