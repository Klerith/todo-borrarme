import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'Buy Milk', completedAt: new Date() },
  { id: 2, text: 'Buy Bread', completedAt: null },
  { id: 3, text: 'Buy Butter', completedAt: new Date() },
];


export class TodosController {

  //* DI
  constructor() { }

  public getTodos = ( req: Request, res: Response ) => {
    res.json( todos );

    // res.json( {
    //   todos: [
    //     { id: 1, text: 'Buy Milk', done: false },
    //     { id: 2, text: 'Buy Bread', done: false },
    //     { id: 3, text: 'Buy Butter', done: false },
    //   ]
    // });
  };

  public getTodoById = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    // return res.json(id) // demostrar que es un número

    const todo = todos.find( todo => todo.id === id );
    ( todo )
      ? res.json( todo )
      : res.status( 404 ).json( { error: 'Not Found' } );

  };


  public createTodo = ( req: Request, res: Response ) => {
    const { text, done } = req.body;

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    };

    todos.push( newTodo );
    res.status( 201 ).json( newTodo );

  };


  public updateTodo = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;
    

    const todo = todos.find( todo => todo.id === id );
    if ( !todo ) return res.status( 404 ).json( { error: 'Not Found' } );

    todo.text = text || todo.text;
    ( completedAt === 'null' ) 
      ? todo.completedAt = null
      : todo.completedAt = new Date(completedAt || todo.completedAt);
      
    // Tecnicamente esto no es necesairo
    // todos.forEach( ( todo, index ) => {
    //   if ( todo.id === id ) {
    //     todos[ index ] = todo;
    //   }
    // });

    res.json( todo );

  };


  public deleteTodo = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    const todo = todos.find( todo => todo.id === id );
    if ( !todo ) return res.status( 404 ).json( { error: 'Not Found' } );

    todos.splice( todos.indexOf( todo ), 1 );
    res.json( todo );
  };


}