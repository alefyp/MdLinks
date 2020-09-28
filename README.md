# Markdown Links

> Link recognition module to identify broken/working links in markdown files. 
> By default understands: http(s)://... , ftp://..., mailto:... & //... links « "fuzzy" links and emails (google.com, foo@bar.com).

## Index

* [Install](##Install)
* [Usage](##Usage)
  * [Javascript API](###JavascriptAPI)
  * [CLI](###CLI)
    * [Default](####Default)
    * [Validate](####Validate)
    * [Stats](####Stats)
    * [Directories](####Directories?)
* [Issues](##Issues)


## Install
```console
$ npm install @alefyyyy/md-links
```

## Usage

### JavascriptAPI

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
                //still just one array as result with same keys per object even with multiples files
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

For markdown files without links you will receive the followin object:


### CLI

`md-links <path> [options]`

#### Default 

`md-links <path>`

log with:
> |file | line | text |
---------------------
* file: file name
* line: line where the link was found in the specified file
* text: text reference as (example)[link] will return text, if the link is not reference in that way, it will returns the entire line content as text description

```console
$ md-links alefy.md
alefy.md 1 http://google.com google.com
alefy.md 2 http://www.alefy.com www.alefy.com
alefy.md 3 https://www.npmjs.com/package/chalk https://www.npmjs.com/package/chalk
```

#### Validate

`md-links <path> --validate`

log with:
> | file | line | text | check | status | 
------------------------------------
* check: 'ok' for working links and 'broken' for... yes, broken links.
* status: status code from response, it can be undefined for unexistant links 

```console
$ md-links alefy.md --validate
 alefy.md 1 http://google.com google.com ok 200
 alefy.md 2 http://www.alefy.com www.alefy.com broken undefined
 alefy.md 3 ttps://www.npmjs.com/package/chalk https://www.npmjs.com/package/chalk ok 200
 ```

 #### Stats

 `md-links <path> --stats`

log with:
> | total | unique | 
* link: total links found
* unique: unique links found 


```console
$ md-links alefy.md --stats
total: 3
unique: 3
```

#### Validate ft. stats

`md-links alefy.md --stats --validate`

log with:
> | total | unique | broken | 
* link: total links found
* unique: unique links found 
* broken: total broken links found

```console
$ md-links alefy.md --stats --validate
total: 3
unique: 3
broken: 1
```
#### Directories?

both flag options work with directories as well:

```console
$ md-links ../folderdemo --stats --validate
total: 12
unique: 10
broken: 2
```
## Issues

Typos detected: Working on it :p


