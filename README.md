## Markdown Links
#### By Alefy


Link recognition module to identify broken/working links in markdown files.

[![npm dependents](https://badgen.net/npm/dependents/chalk)](https://www.npmjs.com/package/chalk?activeTab=dependents) [![Downloads](https://badgen.net/npm/dt/chalk)](https://www.npmjs.com/package/chalk) 

By default understands:

http(s)://... , ftp://..., mailto:... & //... links
"fuzzy" links and emails (google.com, foo@bar.com).

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
                //   status: status code/ it can be undefined for unexistant links   
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

#### Default 

Just try md-links <path>

```console
$ md-links alefy.md
alefy.md 1 http://google.com google.com
alefy.md 2 http://www.alefy.com www.alefy.com
alefy.md 3 https://www.npmjs.com/package/chalk https://www.npmjs.com/package/chalk
```

### Validate

md-links <path> --validate

log with file line text check status, each match describe as follows:
file: file name
line: line where the link was found in the specified file
text: text reference as (example)[link] will return text, if the link is not reference in that way, it will returns the entire line content as text description
check: 'ok' for working links and 'broken' for... yes, broken links.
status: status code from response, it can be undefined for unexistant links 

```console
$ md-links alefy.md --validate
 alefy.md http://google.com google.com ok 200
 alefy.md http://www.alefy.com www.alefy.com broken undefined
 alefy.md https://www.npmjs.com/package/chalk https://www.npmjs.com/package/chalk ok 200
```


```console
$ md-links alefy.md --stats
total: 3
unique: 3
```

both flag options work with directories as well:

```console
$ md-links ../folderdemo --stats --validate
total: 12
unique: 10
broken: 2
```


