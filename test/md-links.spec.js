/**
 * @jest-environment node
 */

jest.setTimeout(48000); // in milliseconds


const mdLinks = require('../src/index');
const mockObj = require('./__mocks__')

const filepathmd = '../../Proyecto4/FolderDemo/disney.md';
const dirpath = '../FolderDemo'
const notvalidfile = '../../invalidapath.md'
const notvalidfilepng = '../Md Links.png'

console.log(dirpath);
describe('mdLinks files', () => {


  test('It should return an array with 3 objects /md file', () => {
    return mdLinks(filepathmd).then(data => {
      expect(data).toStrictEqual(mockObj.fileResult);
    });
  });

  test('It should return an array with 3 objects with status and validate keys /md file', () => {
    return expect(mdLinks(filepathmd, { validate: true })).resolves.toStrictEqual(mockObj.fileValidate);
  });

  test('It should validate the links in /folder', () => {
    return expect(mdLinks(dirpath, { validate: true })).resolves.toMatchObject(mockObj.dirValidate);
  });

  // test('It should return an array of objects /folder', () => {
  //   return expect(mdLinks(dirpath)).resolves.toMatchObject(mockObj.dirResult);
  // });

  test('fails with no such file or directory like', () => {
    return expect(mdLinks(notvalidfile)).rejects.toStrictEqual(new Error(`ENOENT: no such file or directory, open 'C:\Users\Alefy\Documents\Laboratoria\invalidapath.md'`));
  });

  test('fails with not supported file error', () => {
    
    return expect(mdLinks(notvalidfilepng)).rejects.toStrictEqual(new Error('Not supported file, markdown files only'));
  });

});

