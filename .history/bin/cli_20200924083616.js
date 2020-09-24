#!/usr/bin/env node
const chalk = require("chalk");
var argv = require('yargs').argv;
const mdLinks = require('../src/index');
const path = require('path'); //lo uso para mostrar el archivo solito y que se vea más bonito


const yargs = require("yargs");
const { link } = require("fs");

const userEnt = argv._;





const options = yargs
 .option("stats", { alias: "s", describe: "run stats broken/unique ", type: "boolean", demandOption: false })
 .option("validate", { alias: "v", describe: "run status check", type: "boolean", demandOption: false })
 .argv;



 
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
return out.length; // out.lenght 
}





 if(options.stats){
  mdLinks(userEnt[0], { validate: options.validate }).then((element) =>{

    let arrLinks =[];
    let arrBroken = [];



    element.forEach((e) =>{
      if(e.link != undefined){
        arrLinks.push(e.link);
      }
    });


    console.log(chalk.bold('total: ') + `${arrLinks.length}`)
    console.log(chalk.bold('unique: ') + `${stats(arrLinks)}`)

    if(options.validate){
      element.forEach((e) =>{
        if(e.check === 'broken'){
          arrBroken.push(e.link);
        }
      });

      console.log(chalk.bold('broken: ') + `${arrBroken.length}`)
    }

    
  }).catch((e) => {
    const errorText = chalk.yellow('did you try md-links <path> [options] correctly?');
      console.log(`${errorText} ${e.message}`);
  })



}

console.log(options.stats)

if( options.stats == undefined ){



  mdLinks(userEnt[0], { validate: options.validate }).then((e) => {
    e.forEach(element => {
      if(element.text == undefined){
        const folderP = path.basename(element.filePath);
        const noLinksMessage = chalk.red('This file does not contain any links');
        console.log(` ${folderP} ${noLinksMessage}`);
      }
      else{
        const folderP = path.basename(element.file);
        const trunkText = chalk.gray(element.text.substr(0, 49));
        const linkText = chalk.blue(element.link);
        
        let checkText = "owo";
        if(options.validate){     
          element.check == 'broken' ? checkText = chalk.red(element.check) : checkText = chalk.green(element.check);
          console.log(` ${folderP} ${linkText} ${trunkText} ${checkText} ${element.status}`); 
        }else{
          console.log(` ${folderP} ${linkText} ${trunkText}`); 
        }
      }
    });
  })
    .catch((e) =>{
      const errorText = chalk.yellow('did you try md-links <path> [options] correctly?');
      console.log(`${errorText} ${e.message}`);
    });
}
  














