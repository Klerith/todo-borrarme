import express, { type Router } from 'express';
import spdy from 'spdy';
import fs from 'fs';

interface ServerOptions {
  port: number;
  staticFolder?: string;
  certificateDir?: string;
  ssl?: boolean;
  routes: Router;
}


export class Server {

  private app = express();
  private port: number;
  private staticFolder: string;
  private certificateDir: string;
  private ssl: boolean;

  constructor(
    private readonly options: ServerOptions
  ) {
    const {
      port,
      staticFolder = 'public',
      certificateDir = './keys',
      ssl = false,
    } = options;

    this.port = port;
    this.staticFolder = staticFolder;
    this.certificateDir = certificateDir;
    this.ssl = ssl;
  }


  async start() {



    //* Middlewares
    this.app.use( express.json() );
    this.app.use( express.urlencoded( { extended: true } ) ); //  x-www-form-urlencoded extended 

    //https://expressjs.com/en/advanced/best-practice-performance.html
    // const compression = require('compression')
    // app.use(compression())
    // Set up rate limiter: maximum of twenty requests per minute
    // const RateLimit = require( "express-rate-limit" );
    // const limiter = RateLimit( {
    //   windowMs: 1 * 60 * 1000, // 1 minute
    //   max: 20,
    // } );
    // // Apply rate limiter to all requests

    //* Static Files
    this.app.use( express.static( this.staticFolder ) );

    //* Routes
    this.app.use( this.options.routes );
    // this.app.get('/api/todos', (req, res) => {
    //   res.json({
    //     todos: [
    //       { id: 1, text: 'Buy Milk', done: false },
    //       { id: 2, text: 'Buy Bread', done: false },
    //       { id: 3, text: 'Buy Butter', done: false },
    //     ]
    //   })
    // });


    this.listen();
  }

  private listen() {

    if ( !this.ssl ) {
      this.app.listen( this.port, () => {
        console.log( `Server running on port ${ this.port }` );
      } );
      return;
    }

    spdy.createServer(
      {
        key: fs.readFileSync( `${ this.certificateDir }/server.key` ),
        cert: fs.readFileSync( `${ this.certificateDir }/server.crt` ),
      },
      this.app
    ).listen( this.port, () => {
      console.log( `HTTP2 SSL Enabled Server running on port ${ this.port }` );
    } );

  }


}