import React, { useEffect, useState } from 'react'
import EditTodo from './editTodo.js'

const ListTodos = () => {
  const [descriptions, setDescriptions] = useState([])
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos")
      const jsonData = await response.json()
      setDescriptions(jsonData)
    }
    catch(error) {
      console.error(error)
    }
  }

  const deleteTodo = async id => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`,{
        "method": "DELETE"
      })
      console.log(response)
      setDescriptions(descriptions.filter(row => row.id !== id))
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  console.log(descriptions)

  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Descrption</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
    <tbody>
      {descriptions.map(row=>{
          return (
            <tr key={row.id}>
              <td>{row.description}</td>
              <td>
                <EditTodo row={row}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => { deleteTodo(row.id)}}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        }
      )}
    </tbody>
</table>

  )
}

export default ListTodos
