import '../css/app.css'
const axios = require('axios').default

function getImage() {
  const data = axios.get('/api/v2/random')
  return data.url
}

getImage()
