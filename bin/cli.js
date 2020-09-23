#!/usr/bin/env node
const chalk = require("chalk");
const yargs = require("yargs");
const path = require('path'); 
const mdLinks = require('../src/index');



// const options = yargs
//   .usage("Usage: --validate <validate>")
//   .option("-validate", { alias: "validate", describe: "path", type: "string", demandOption: false })
//   .argv;

const todo = yargs.argv._; //path required

mdLinks(todo[0]).then((e) => {
  e.forEach(element => {
    const trunkText = chalk.green(element.text.substr(0, 49)); //text trunk to 50 characters
    const linkText = chalk.blue(element.link);
    console.log(`${todo[0]} ${linkText} ${trunkText}`);
  });
})
  .catch(console.log);



