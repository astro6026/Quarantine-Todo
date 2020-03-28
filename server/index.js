const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); 

//middleware
app.use(cors());
//gives us access to retrive the request.body object from the client
app.use(express.json());

//ROUTES

//create a todo 
app.post("/todos",async (req,res) => {
    try 
    {
        // this contains the request body recieved from the client
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) values($1) returning *",[description]);
        res.json(`New To Do item -  ${newTodo.rows[0].description}`)
    } catch (error) {
        console.error(error.message);
    }
});

// get all todos 
app.get("/todos",async (req,res) => {
    try {
        const allTodos = await pool.query("Select * from todo");
        res.json(allTodos.rows)
    } catch (error) {
     console.error(error.message)   
    }
})

//get a single todo
app.get("/todos/:id",async(req,res) => {
    try {
        const {id} = req.params
        const requestedTodos = await pool.query("Select description from todo where id=($1)",[id]);
        if (requestedTodos.rows.length>0) {
            res.json(requestedTodos.rows)     
        }
        else{
            res.json("No Todo Item Found with given id found")
        }
        res.json

    } catch (error) {
        console.error(error.message)
    } 
})

//update a todo
app.put("/todos/:id",async (req,res) => {
    try {
        const {id} = req.params
        const {description} =req.body 
        console.log(req.body)
        const updatedTodo = await pool.query("Update todo set description=($1) where id=($2)",[description,id])
        res.json("Successfully updated")
    } catch (error) {
        console.error(error.message)
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const queryResponse = await pool.query("delete from todo where id=($1)", [id]);
        res.json("Deletion Successful")
    } catch (error) {
        console.error(error.message)
    }
})
app.listen(5000, ()=>{
    try {
        console.log('server has started on port 5000'); 
    } catch (error) {
        console.error('server has not started on port 5000'); 
    }
    //console.log('server has started on port 5000');
})
