import React from 'react'
import './App.css'

import InputTodo from './component/inputTodo.js'
import ListTodos from './component/listTodos.js'


function App() {
  return (
    <>
      <div className="container">
        <InputTodo/>
        <ListTodos/>
      </div>
    </>
  )
}

export default App;
