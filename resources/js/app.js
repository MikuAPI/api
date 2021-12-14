import '../css/app.css'
import axios from 'axios'

async function getData() {
  const response = await axios.get('/api/v3/random')
  return response.data
}

getData().then((data) => console.log(data))
