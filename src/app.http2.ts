import http2, { Http2ServerRequest, Http2ServerResponse } from 'http2';
import fs from 'fs';


const onRequestHanler = (req:Http2ServerRequest, res: Http2ServerResponse) => {
  const currentUrl = new URL(req.url || '', 'http://localhost:3000');
  // const knownPaths = ['/','/accounts'];

  // console.log(currentUrl);

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end('<h1>Done</h1>'); //end the response

  // const data = { name: 'John Doe', age: 30, city: 'New York' };
  // res.writeHead(201, { 'Content-Type': 'application/json' });
  // res.end( JSON.stringify(data) ); //end the response

  if ( req.url === '/' ) {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end( htmlFile ); //write a response

  } else {
    try {
      const file = `./public${ req.url }`;
      const fileExtention = file.split('.').at(-1);
      const fileContent = fs.readFileSync(file, 'utf-8');
  
      res.writeHead(200, { 'Content-Type': `text/${ fileExtention }` });
      res.end( fileContent ); //write a response
      
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end( '<h1>404 Page not found</h1>' ); //write a response
    }
  }


}


const server = http2.createSecureServer( {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
},onRequestHanler)


server.listen(3000, () => {
  console.log('Server running on port 3000');
});
  



