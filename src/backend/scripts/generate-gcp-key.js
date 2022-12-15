// Load the GCP Key file on our production server
// The file is not stored in git,
// so the production server will need to generate it from .env

require('dotenv').config()
const fs = require('fs')

// Check for the key file
const files = fs.readdirSync(`${__dirname}/../api/file-upload/google_storage`);
console.log(files);
var key_exists = false;
for (var file of files) {
  if (process.env.KEY_FILE_NAME === file) {
    key_exists = true
    break
  }
}

if (!key_exists) {
  // Generate the key
  const path = `${__dirname}/../api/file-upload/google_storage/${process.env.KEY_FILE_NAME}`
  var private_key = process.env.private_key
  private_key = private_key.replace(/\n/g, '\\n')
  fs.writeFileSync(path, `
  {
    "type": "${process.env.type}",
    "project_id": "${process.env.project_id}",
    "private_key": "${private_key}",
    "client_email": "${process.env.client_email}",
    "client_it": "${process.env.client_id}",
    "auth_uri": "${process.env.auth_uri}",
    "token_uri": "${process.env.token_uri}",
    "auth_provider_x509_cert_url": "${process.env.auth_provider_x509_cert_url}",
    "client_x509_cert_url": "${process.env.client_x509_cert_url}"
  }
  `)

  const files = fs.readdirSync(`${__dirname}/../api/file-upload/google_storage`);
  console.log('files now', files);
}
