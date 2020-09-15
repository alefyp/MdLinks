const axios = require('axios');

//async 
axios.get('https://fantoniak.xyz/test').then((res) =>{
  console.log("Este es el res:", res.status); // 404
}, (e) =>{
  console.log("Este es el otro callbak:", e);
  return Promise.resolve(e);
}).then((loquesea) => {console.log(loquesea);
  return 'Holi'
}).then(console.log);