require('dotenv').config()
const fs = require('fs');
const axios = require('axios');

// Looking for index.html in /frontend
const files = fs.readdirSync(`${__dirname}/../frontend`);
var key_exists = false;
for (var file in files) {
  if (file === 'index.html') {
    key_exists = true;
    break;
  }
}

if (key_exists) {
  console.log("index.html exists, stopping");
} else {
  console.log('Fetching index.html');
  axios
    .get('https://waterloop-cms.netlify.app')
    .then((response) => {
      fs.writeFileSync(`${__dirname}/../frontend/index.html`, response.data);
      console.log('index.html generated');
    })
    .catch(e => {
      console.error(e);
    });
}
