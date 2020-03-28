import React, {
  useState
} from 'react';

const InputTodo = () => {
  const [ description, setDescription ] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const body = { description }
    try {
      const response = await fetch("http://localhost:5000/todos", {
        "method": "POST",
        "headers": { "Content-Type" : "application/json" },
        "body": JSON.stringify(body)
      })
      window.location = "/"
    } catch (error) {
        console.error(error.message)
    }
  }

  return ( <>
      <h1 className = "text-center mt-5" > Quarantine ToDo List </h1>
        <form className = "mt-5 d-flex" onSubmit= { onSubmitForm } >
          < input type = "text"
            className = "form-control"
            value = {description}
            onChange = {e => setDescription(e.target.value)} />
          <button className = "btn btn-success">Add</button>
        </form>
        </>
      )
  }
  export default InputTodo
