const mdLinks = require('./index.js');


const filepathmd = '../FolderDemo/disney.md';
const dirpath = '../FolderDemo'
const notvalidfile = '../Md links.png'


mdLinks(filepathmd)
  .then(links => {
    console.log(links);
    //=> [{ href, text, file}]
  })
  .catch(console.error);

mdLinks(notvalidfile)
.then(links => {
  console.log(links);
  //=> [{ href, text, file}]
})
.catch(console.error);
  
mdLinks(filepathmd, { validate: true })
  .then(links => {
    console.log(links);
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks(dirpath)
  .then(links => {
    console.log(links);
    // => [{ href, text, file }]
  })
  .catch(console.error);