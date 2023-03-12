import {useState} from 'react'


function Filter ({setFilter}) {
    const [topic, setTopic] = useState("");

    const change = (e) => {
        setTopic(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault();
        setFilter(topic);
    }
  return (
    <div>
        <p>Filter by topic:</p>
        <form onSubmit={submit} onChange={change}>
            <input type='text' id='topic' name='topic' placeholder='Topic filter'/>
            <input type='submit' id='submit'/>
        </form>
    </div>
  )
}

export default Filter;
