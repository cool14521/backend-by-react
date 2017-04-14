import fs from 'fs'
import path from 'path'

export default function renderHomePageAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../../', 'src/views/index.html'), (err, data) => {
      if (err) { reject(err) } else { resolve(data.toString()) }
    })
  })
}