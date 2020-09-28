const mdLinks = require('./index');


const filepathmd = '../../FolderDemo/disney.md';
const dirpath = '../../FolderDemo'
const notvalidfile = '../../Md links.png'

// mdLinks(notvalidfile)
// .then(links => {
//   console.log(links);
//   //=> [{ href, text, file}]
// })
// .catch(console.error); //err

// mdLinks(filepathmd)
//   .then(links => {
//     console.log(links);
//     //=> [{ href, text, file}]
//   })
//   .catch(console.error);
  
// mdLinks(filepathmd, { validate: true })
//   .then(links => {
//     console.log(links);
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);

// mdLinks(dirpath)
//   .then(links => {
//     console.log(links);
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);

  mdLinks(dirpath, {validate: true})
  .then(links => {
    console.log(links);
    // => [{ href, text, file }]
  })
  .catch(console.error);