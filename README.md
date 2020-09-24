## Markdown Links
#### By Alefy

[![npm dependents](https://badgen.net/npm/dependents/chalk)](https://www.npmjs.com/package/chalk?activeTab=dependents) [![Downloads](https://badgen.net/npm/dt/chalk)](https://www.npmjs.com/package/chalk) 

## Index

* [Install](##Install)
* [Usage](##Usage)


***

## Install
```console
$ npm install @alefyyyy/md-links
```

## Usage

### Javascript API

```js
const mdLinks = require('@Alefyyyy/md-links)

//individual file as argument
mdLinks("./some/example.md")
  .then((links) => {console.log(links);
                // [
                //   {
                //   link: link,
                //   line: Line where the link was found,
                //   text: Text referred to the link,
                //   file: Absolute path of the file,        
                //   }
                // ]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => { console.log(links);
                // [
                //   {
                //   link: link,
                //   line: Line where the link was found,
                //   text: Text referred to the link,
                //   file: Absolute path of the file, 
                //   status: status code/ undefined when     
                //   check: ok/broken according to status.  
                //   }
                // ]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => { console.log(links);
                //still just one array as result with same keys per object
                // [
                //   {
                //   link: link,
                //   line: Line where the link was found,
                //   text: Text referred to the link,
                //   file: Absolute path of the file,        
                //   }
                // ]
    
  })
  .catch(console.error);
```
### CLI

md-links <path> [options]

```console
$ md-links readme.md
 readme.md https://badgen.net/npm/dependents/chalk Downloads
 readme.md https://www.npmjs.com/package/chalk?activeTab=dependents Downloads
 readme.md https://badgen.net/npm/dt/chalk Downloads
 readme.md https://www.npmjs.com/package/chalk Downloads
```
```console
$ md-links readme.md --validate
 readme.md https://badgen.net/npm/dependents/chalk Downloads
 readme.md https://www.npmjs.com/package/chalk?activeTab=dependents Downloads
 readme.md https://badgen.net/npm/dt/chalk Downloads
 readme.md https://www.npmjs.com/package/chalk Downloads
```


