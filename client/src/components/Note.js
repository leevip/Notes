import React from 'react'

function Note({note}) {
  return (
    <div className='note'>
      <h3>{note.topic}</h3>
      <h4>{note.name}</h4>
      <p>{note.content}</p>
      <p>{note.time}</p>
    </div>
  )
}

export default Note