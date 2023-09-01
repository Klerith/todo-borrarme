import http from 'http';

import fs from 'fs';




const server = http.createServer((req, res) => {

  console.log(req.url);
  
  // res.write('Hello World!'); //write a response
  // res.end(); //end the response
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello World!</h1>'); //write a response
  res.end(); //end the response


  // const data = { name: 'John Doe', age: 30, city: 'New York' };

  // res.writeHead(201, { 'Content-Type': 'application/json' });
  // res.write( JSON.stringify(data) ); //write a response
  // res.end(); //end the response

  // if ( req.url === '/' ) {
  //   const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
  //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //   res.write( htmlFile ); //write a response
  //   res.end(); //end the response
  // } else {
  //   try {
  //     const file = `./public${ req.url }`;
  //     const fileExtention = file.split('.').at(-1);
  //     const fileContent = fs.readFileSync(file, 'utf-8');
  
  //     res.writeHead(200, { 'Content-Type': `text/${ fileExtention }` });
  //     res.write( fileContent ); //write a response
  //     res.end(); //end the response
      
  //   } catch (error) {
  //     res.writeHead(404, { 'Content-Type': 'text/html' });
  //     res.write( '<h1>404 Page not found</h1>' ); //write a response
  //     res.end(); //end the response
  //   }
  // }

})

server.listen(3000, () => {
  console.log('Server running on port 3000');
})