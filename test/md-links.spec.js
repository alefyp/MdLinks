const mdLinks = require('../src/index');
const { dirResult } = require('./__mocks__');
const mockObj = require('./__mocks__')

const filepathmd = '../../Proyecto4/FolderDemo/disney.md';
const dirpath = '../FolderDemo'
const notvalidfile = '../../Md links.png'


describe('mdLinks', () => {

  test('It should return an array of objects /md file', () => {
    return mdLinks(filepathmd).then(data => {
      expect(data).toStrictEqual(mockObj.fileResult);
    });
  });

  test('It should return an array of objects with a validate and status key /md file', () => {
    return mdLinks(filepathmd, { validate: true }).then(data => {
      expect(data).toStrictEqual(mockObj.fileValidate);
    });
  });

  // test('It should return an array of objects /dir file', () => {
  //   return mdLinks(dirpath).then(data => {
  //     expect(data).toStrictEqual(mockObj.dirResult);
  //   });
  // });

  // test('It should return an array of objects with a validate and status key /dir', () => {
  //   return mdLinks(dirpath, { validate: true }).then(data => {
  //     expect(data).toStrictEqual(mockObj.dirValidate);
  //   });
  //});

});
