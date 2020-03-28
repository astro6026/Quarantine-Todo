import React,{ useState} from 'react'

const EditTodo = ({row}) => {
  const [description, setDescription] = useState(row.description)

  const updateDescription = async (e) => {
    e.preventDefault()

    try {
      const body = { description }
      const response = await fetch(`http://localhost:5000/todos/${row.id}`,{
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
      })
      console.log(response)
      window.location = "/"
    }
    catch(error) {
      console.error(error.message)
    }
  }

  return (
    <>
    <button
      type="button"
      class="btn btn-warning"
      data-toggle="modal"
      data-target={`#myModal${row.id}`}
    >
      Update
    </button>

    <div
      class="modal"
      id={`myModal${row.id}`}
      onClick={()=> setDescription(row.description)}
      >
      <div class="modal-dialog">
        <div class="modal-content">

    <div class="modal-header">
      <h4 class="modal-title">Modal Heading</h4>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        onClick={()=> setDescription(row.description)}
        >
        &times;
      </button>
    </div>

    <div class="modal-body">
      <input
        type="text"
        className="form-control"
        value={description}
        onChange={e => {setDescription(e.target.value)}}/>
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        onClick={e => updateDescription(e)}>
         Update
       </button>
      <button
        type="button"
        class="btn btn-danger"
        onClick={()=> setDescription(row.description)}
        data-dismiss="modal"
        >
        Close
      </button>
    </div>

    </div>
  </div>
  </div>
  </>
  )
}

export default EditTodo
