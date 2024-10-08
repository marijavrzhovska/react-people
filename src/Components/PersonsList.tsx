import { useState, useRef, useEffect } from "react";
import { Person } from "../Types/Person";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PersonsList() {
  const [persons, setPersons] = useState<Person[]>([]);

  const fetched = useRef(false);

  const {addMessage} = useMessages();
  useEffect(()=> {
    if(!fetched.current){
      fetch(`${apiUrl}/persons`).then(rez => {
        return rez.json();
      }).then(data => {
        setPersons(data);
        addMessage('people added')
      })
      fetched.current = true;
    }
    
  }, [addMessage])

  async function deletePerson(person: Person){
    try {
      const response = await fetch(`${apiUrl}/persons/${person.id}`, {
        method: 'DELETE'
      });
      if(!response.ok) throw new Error('Request failed:' + response.status);
      setPersons(prevPersons => prevPersons.filter(h => h.id !== person.id));
      addMessage(`Person ${person.name} deleted `);
    } catch (error) {
      console.log(error);
      addMessage('Failed to delete person');
    }
  }
  
  return (
    <>
        <div className="flex gap-3">
        <h2 className="text-2xl">People</h2>
        <Link to='/persons/create' className='p-2 bg-slate-700 text-white rounded-lg'>Create new</Link>
        </div>
        
        <ul className="flex flex-col gap-2 my-3">
          {persons.map(person => (
            <Link to={`/persons/${person.id}`} key={person.id} className="flex cursor-pointer" >
              <span className="bg-slate-700 text-red-500 rounded-l p-2">{person.id}</span>

              <div className="p-2 bg-slate-300 rounded-r w-full flex justify-between">
              <span >{person.name}</span>
              <span 
              onClick={(e) =>{
                e.preventDefault();
                deletePerson(person);
              } }
              className="bg-white px-1 cursor-pointer">
                X
              </span>
              </div>

              
            </Link>
          ))}
        </ul>
    </>
  )
}

