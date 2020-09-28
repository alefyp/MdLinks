//file

const fileResult = [
  {
    link: 'https://www.disney.com//',
    line: 3,
    text: 'Disney',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\disney.md'
  },
  {
    link: 'https://www.shopdisney.com/?cmp=OTL-Dcom_ChromShpIconB_Shop_EFC28055&efc=280559&att=DcomM_HP_Feed_DSIMobileRedirect_t',
    line: 4,
    text: 'Disney Shop',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\disney.md'
  },
  {
    link: 'https://disneylatino.com/peliculas',
    line: 5,
    text: 'Disney Latino',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\disney.md'
  }
];

//dir

const dirResult = [
  {
    link: 'https://www.freecodecamp.org/news/',
    line: 3,
    text: 'FreeCodeCamp',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Carpeta Final\\Cursos.md'
  },
  {
    link: 'https://www.freecodecamp.org/news/',
    line: 4,
    text: 'Explicación de promesas',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Carpeta Final\\Cursos.md'
  },
  {
    link: 'https://fullstackopen.com/en/about',
    line: 5,
    text: 'Curso de Fullstack',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Carpeta Final\\Cursos.md'
  },
  {
    filePath: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Nadita\\vacio.md',
    check: 'No links detected in this file'
  },
  {
    link: 'https://nodejs.org/es/',
    line: 5,
    text: 'Node.js',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Dentro C2\\Archivo.md'
  },
  {
    link: 'https://developers.google.com/v8/',
    line: 6,
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Dentro C2\\Archivo.md'
  },
  {
    link: 'https://www.freecodecamp.org/news/',
    line: 3,
    text: 'Traductor de google',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Traductor.md'
  },
  {
    link: 'https://www.lapaginadeAlejandraeeeee.org/news/',
    line: 4,
    text: 'Esta página no existe!',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Traductor.md'
  },
  {
    link: 'http://google.com/asdf',
    line: 6,
    text: 'Página que debería dar status 404',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Traductor.md'
  },
  {
    link: 'https://www.disney.com//',
    line: 3,
    text: 'Disney',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Disney.md'
  },
  {
    link: 'https://www.shopdisney.com/?cmp=OTL-Dcom_ChromShpIconB_Shop_EFC28055&efc=280559&att=DcomM_HP_Feed_DSIMobileRedirect_t',
    line: 4,
    text: 'Disney Shop',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Disney.md'
  },
  {
    link: 'https://disneylatino.com/peliculas',
    line: 5,
    text: 'Disney Latino',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Disney.md'
  }
];

//file validate

const fileValidate = [
  {
    link: 'https://www.disney.com//',
    line: 3,
    text: 'Disney',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\disney.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://www.shopdisney.com/?cmp=OTL-Dcom_ChromShpIconB_Shop_EFC28055&efc=280559&att=DcomM_HP_Feed_DSIMobileRedirect_t',
    line: 4,
    text: 'Disney Shop',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\disney.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://disneylatino.com/peliculas',
    line: 5,
    text: 'Disney Latino',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\disney.md',
    status: 200,
    check: 'ok'
  }
];

//dir validate

const dirValidate = [
  {
    link: 'https://www.freecodecamp.org/news/',
    line: 3,
    text: 'FreeCodeCamp',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Carpeta Final\\Cursos.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://www.freecodecamp.org/news/',
    line: 4,
    text: 'Explicación de promesas',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Carpeta Final\\Cursos.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://fullstackopen.com/en/about',
    line: 5,
    text: 'Curso de Fullstack',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Carpeta Final\\Cursos.md',
    status: 200,
    check: 'ok'
  },
  {
    filePath: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 1\\Dentro C1\\Nadita\\vacio.md',
    check: 'No links detected in this file'
  },
  {
    link: 'https://nodejs.org/es/',
    line: 5,
    text: 'Node.js',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Dentro C2\\Archivo.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://developers.google.com/v8/',
    line: 6,
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Dentro C2\\Archivo.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://www.freecodecamp.org/news/',
    line: 3,
    text: 'Traductor de google',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Traductor.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://www.lapaginadeAlejandraeeeee.org/news/',
    line: 4,
    text: 'Esta página no existe!',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Traductor.md',
    check: 'broken'
  },
  {
    link: 'http://google.com/asdf',
    line: 6,
    text: 'Página que debería dar status 404',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Carpeta 2\\Traductor.md',
    status: 404,
    check: 'broken'
  },
  {
    link: 'https://www.disney.com//',
    line: 3,
    text: 'Disney',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Disney.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://www.shopdisney.com/?cmp=OTL-Dcom_ChromShpIconB_Shop_EFC28055&efc=280559&att=DcomM_HP_Feed_DSIMobileRedirect_t',
    line: 4,
    text: 'Disney Shop',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Disney.md',
    status: 200,
    check: 'ok'
  },
  {
    link: 'https://disneylatino.com/peliculas',
    line: 5,
    text: 'Disney Latino',
    file: 'C:\\Users\\Alefy\\Documents\\Laboratoria\\Proyecto4\\FolderDemo\\Disney.md',
    status: 200,
    check: 'ok'
  }
];

module.exports = {
  dirValidate,
  fileResult,
  fileValidate,
  dirResult
  
}