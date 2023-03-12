import {useState} from 'react'

function AddNote({setNotes, notes}) {
  const [newNote, setNote] = useState({})
  const [message, setMessage] = useState("") //Possible error message

  const submit = (e) => {
    e.preventDefault();
    console.log(Date());
    fetch("/api/note", {    //POST call to backend server, saves a new note to database
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(data => {
        if(data.error){         //If an error occurs on the backend server function an error message is shown
          console.log(data.error);
          setMessage(data.error);
        } else {            //The note is added to the page
          console.log(data)
          setNotes([...notes, {
            id: data.note_id,
            topic: data.topic,
            name: data.note_name,
            content: data.content,
            time: data.time
          }])
        }
      })
  }

  const change = (e) => {
    setNote({...newNote, time: Date(), [e.target.name]: e.target.value})
  }

  return (
    <div className='new-note'>
        <form onSubmit={submit} onChange={change}>
          <div>
            <input type='text' id='topic' name='topic' placeholder='topic'/>
            <input type='text' id='name' name='name' placeholder='note'/>
          </div>
            <textarea className='note-content' id='content' name='content' placeholder='New note'/>
            <input type='submit' id='submit'/>
        </form>
        <p className='error'>{message}</p>
    </div>
  )
}

export default AddNote
