#!/usr/bin/env node
const chalk = require("chalk");
const yargs = require("yargs");

const mdLinks = require('../src/index');


const todo = yargs.argv._; //path required

mdLinks(todo[0]).then((e) => {
  e.forEach(element => {
    const trunkText = chalk.yellow(element.text.substr(0, 49)); //text trunk to 50 characters
    const linkText = chalk.blue.bold(element.link);
    console.log(`${todo[0]} ${linkText} ${trunkText}`);
  });
})
  .catch(console.log);



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



