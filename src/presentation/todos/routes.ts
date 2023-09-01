import { Router } from 'express';
import { TodosController } from './controller';




export class TodosRoutes {

  static get routes():Router {
    const router = Router();
    const controller = new TodosController();

    router.get( '/', controller.getTodos );
    router.get( '/:id', controller.getTodoById );

    router.post( '/', controller.createTodo ); // <-- Create
    router.put( '/:id', controller.updateTodo ); // <-- Update
    router.delete( '/:id', controller.deleteTodo );

    // router.get( '/', ( req, res ) => {
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