import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());



app.all('/',(req , res)=>{
  console.log('Request >' , req);
  console.log('Response >' , res);
  res.send(`I'm up!`);
})

const todos = 
[
    {
      id:'1',
      task:'task 1',
      completed: false
    },
    {
      id:'2',
      task:'task 2',
      completed: true
    }
]

//READ
app.get('/todos' , (req , res)=>{
  res.json(todos)
})



//CREATE
app.post('/todos' , (req , res)=>{
  const newTodos = req.body;
  todos.push(newTodos)
  res.json({
    status:'success',
    message:'created'
  })
})

console.log(todos)


// app.post('/todos' , ()=>{
//   res.send('created todo')
// })


//UPDATE
app.put('/todos/:id' , (req , res)=>{
  const newTodoData = req.body;
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex(td => td.id === todoParamId)

  if(todoIndex !== -1){
    todos[todoIndex] = {
      id:todoParamId,
      ...newTodoData,
    }
  }

  res.send(`Todo updated successfully`)
})


//DELETE
app.delete('/todos/:id' , (req , res)=>{
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex(td => td.id === todoParamId);

  if(todoParamId !== -1){
    todos.splice(todoIndex, 1);
  }

  res.json({
    message: 'Todo Deleted successfully'
  })
})


const PORT = 5111;
app.listen(PORT , ()=>{
  console.log(`server is running at port ${PORT}`)
})

