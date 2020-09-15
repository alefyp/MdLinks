const fs = require('fs');
const path = require('path');
const linkify = require('linkify-it')();
const axios = require('axios');

const filePathFromComputer = './forwardlink.md';
const filePicPng = './examplddddde.png';

const mdlinks = (filepath, option) => {

  const readFile = (filePath) => {
    const promise = new Promise ((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
          reject('Not valid file');
        }
        else{
          resolve(data);
        }
      });
    });
    return promise;
  };
  


  //return promise;
}

mdlinks(filePathFromComputer);






