import {createServer} from 'http'

const hostname = 'localhost', port = 4000;

createServer((req,res) => {  
  res.write('hello World')
  res.end()  
}).listen(port, ()=> console.log(`${hostname} 서버접속 완료`))



