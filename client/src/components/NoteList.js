import {useEffect, useState} from 'react';
import Note from './Note';
import AddNote from './AddNote';
import Filter from './Filter';

//Why is this not in GitHub?

const NoteList = () => {

    const [filter, setFilter] = useState("")
    const [notes, setNotes] = useState([])
    const [message, setMessage] = useState("") //Possible error message
    let mounted = false;

    //updateData fetches new data from the backend server
    async function updateData(){
        if(mounted){
            console.log("Fetching data.")
            fetch(`/api/notes/${filter}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    console.log(data.error);
                    setMessage(data.error);
                } else {
                    setNotes([])
                    setNotes(data.map(item => ({
                        id: item.note_id,
                        topic: item.topic,
                        name: item.note_name,
                        content: item.content,
                        time: item.time
                    })))
                }
            })
        }
    }

    useEffect(() => {
        mounted = true;
        updateData();
        
        return () => {
            mounted = false
        };
    }, [])

    //Updating the page if a filter is applied
    useEffect(() => {
        mounted = true;
        updateData();
        
        return () => {
            mounted = false
        };
    }, [filter])

    setInterval(updateData, 60000);
    
    //AddNote has the form and functions to add new notes
    //Filter has the form to change the topic filter

    return (
        <div className='note-list'>
            <AddNote notes={notes} setNotes={setNotes}/>
            <Filter setFilter={setFilter}/>
            <p className='error'>{message}</p>
            {notes.map((note) => (
                <Note key={note.id} note={note}/>
            ))}
        </div>
    )
}

export default NoteList