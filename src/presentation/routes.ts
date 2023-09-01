import { Router } from 'express';
import { TodosRoutes } from './todos/routes';



export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use( '/api/todos', TodosRoutes.routes );

    // router.get( '/api/todos', ( req, res ) => {
    //   res.json( {
    //     todos: [
    //       { id: 1, text: 'Buy Milk', done: false },
    //       { id: 2, text: 'Buy Bread', done: false },
    //       { id: 3, text: 'Buy Butter', done: false },
    //     ]
    //   } );
    // } );


    return router;
  }


}

